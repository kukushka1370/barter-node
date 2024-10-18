import ApiError from "../exceptions/ApiError.js";
import Currency from "../models/currency-model.js";
import { User } from "../models/user-model.js";
import userService from "../services/userService.js";

class UserController {
    async updateUserRating(req, res, next) {
        try {
            const { rating, userId, review } = req.body;
            console.log({rating, userId, review});
            return res.json()
            const user = await User.findOne({ _id: userId });
            if (!user) throw ApiError.BadRequest("Errrrooooorrrr");
            const sum = user.rev.reduce((accum, val) => accum + val, 0);
            user.rating = (sum + rating / user.totalReviews + 1) * 100;
            user.rev += rating;
            user.totalReviews++;
            if (review) {
                user.reviews.push(review);
            }
            await user.save();
            return res.json(user);
        } catch (err) {
            next(err);
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (err) {
            next(err);
        }
    }

    async getAllCurrencies(req, res, next) {
        try {
            const users = await Currency.find();
            console.log(users);
            return res.json(users);
        } catch (err) {
            next(err);
        }
    }

    async approveOrDecline(req, res, next) {
        try {
            const { userId, verdict } = req.body;
            console.log({ userId, verdict });
            const users = await userService.approveOrDecline(userId, verdict);
            return res.json(users);
        } catch (err) {
            next(err);
        }
    }
}

export default new UserController();