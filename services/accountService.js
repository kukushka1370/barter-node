import ApiError from "../exceptions/ApiError.js";
import bcrypt from "bcrypt";
import tokenService from "./tokenService.js";
import { User } from "../models/user-model.js";

class AccountService {
    async activateAccount(activationLink) {
        const user = await User.findOne({ activationLink });

        if (!user) {
            throw ApiError.BadRequest(`Incorrect activation link`);
        }

        user.isActivated = true;
        return user.save();
    }

    async deleteAccount(id, token) {
        if (!token) {
            throw ApiError.Unauthorized();
        }

        const decodedToken = tokenService.validateRefreshToken(token);

        if (id != decodedToken.id) {
            throw ApiError.Forbidden(`We're sorry, but you don't have permission to delete account ${id}`);
        }

        await tokenService.removeToken(token);
        const user = await User.deleteOne({ _id: id });
        return user;
    }

    async changePassword(email, token, pass, newPass) {
        if (!email) {
            throw ApiError.Unauthorized();
        }

        // const decodedToken = tokenService.validateRefreshToken(token);
        // if (decodedToken.email !== email || !decodedToken.role.includes("admin")) {
        //     throw ApiError.Forbidden(`We're sorry, but you don't have permission to change password for ${email}`);
        // }

        const user = await User.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest();
        }

        const isPassCorrect = await bcrypt.compare(pass, user.password);
        if (!isPassCorrect) {
            throw ApiError.BadRequest(`Incorrect password`);
        }

        const isPassEq = pass === newPass;
        if (isPassEq) {
            throw ApiError.BadRequest(`Your new password bust be different from the old one`);
        }

        const newHashPass = await bcrypt.hash(newPass, 5);
        user.password = newHashPass;

        return user.save();
    }
}

export default new AccountService();