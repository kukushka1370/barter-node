import * as uuid from "uuid";
import bcrypt from "bcrypt";

import ApiError from "../exceptions/ApiError.js";
import mailService from "./mailService.js";
import UserDto from "../dtos/userDto.js";
import tokenService from "./tokenService.js";
import { User } from "../models/user-model.js";
import Update from "../models/update-model.js";
import BankAccount from "../models/bank-account-model.js";

class AuthService {
    async registration(email, password, name, surname, phoneNumber, postcode, region, rolee) {
        const candidate = await User.findOne({ email });

        if (candidate) {
            throw ApiError.BadRequest(`User ${email} already exists`);
        }

        const activationLink = uuid.v4();
        const referralLink = uuid.v4();

        const hashPassword = await bcrypt.hash(password, 5);

        const user = new User({
            email,
            activationLink,
            password: hashPassword || "",
            referralLink,
            name,
            surname,
            phoneNumber,
            postcode,
            region,
            isDemo: true,
        });
        await user.save();

        const bankAccount = new BankAccount({ userId: user._id });

        if (rolee) {
            console.log({rolee})
            user.role = ["user", rolee];
            user.isDemo = false;
            if (["owner", "владелец", "Owner", "Владелец"].includes(rolee)) {
                bankAccount.nn = "БАНК";
            }
            await user.save();
        }

        await bankAccount.save();
        console.log(user);

        // await mailService.sendActivationMail(email, `${process.env.API_URL}/user/activation/${activationLink}`); add smtp data to send activation mail

        const userDto = new UserDto({ ...user });
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto._id, tokens.refreshToken);
        const upd = new Update({ msg: `Новый пользователь ${name} ${surname}` });
        await upd.save();

        console.log({ tokens, userDto });

        return {
            ...tokens,
            user: userDto,
        }
    }

    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest(`User ${email} not found`)
        }

        const isPassEq = await bcrypt.compare(password, user.password);
        if (!isPassEq) {
            throw ApiError.BadRequest(`Incorrect password`)
        }

        const userDto = new UserDto({ ...user });
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto._id, tokens.refreshToken);

        console.log({ userDto })

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken) {
        if (!refreshToken) {
            throw ApiError.Unauthorized();
        }
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        const userData = tokenService.validateRefreshToken(refreshToken);
        const userTokenFromDB = await tokenService.findToken(refreshToken);

        if (!userData || !userTokenFromDB) {
            throw ApiError.Unauthorized();
        }

        const user = await User.findOne({ _id: userData._id });
        const userDto = new UserDto({ ...user });
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto._id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }
}

export default new AuthService();