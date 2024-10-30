import ApiError from "../exceptions/ApiError.js";
import Currency from "../models/currency-model.js";
import PostIndex from "../models/post-index-model.js";
import { User } from "../models/user-model.js";
import userService from "../services/userService.js";

class UserController {
    async updateUserRating(req, res, next) {
        try {
            const { rating, userId, review } = req.body;
            console.log({ rating, userId, review });

            const user = await User.findOne({ _id: userId });
            if (!user) throw ApiError.BadRequest("Errrrooooorrrr");

            const sum = user.rev.reduce((accum, val) => accum + +val, 0) + +rating;
            console.log({ sum, rating, "length": user.rev.length, "rev": user.rev })
            user.rating = ((+sum) / (user.rev.length + 1)) * 10;
            console.log((+sum + +rating) / (user.rev.length + 1));
            user.rev.push(+rating);
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

    async updateSystemRating(req, res, next) {
        try {
            const { userId, systemRating } = req.body;
            const user = await User.findOne({ _id: userId });
            user.systemRating = systemRating;
            await user.save();
            return res.json(user);
        } catch (err) {
            next(err);
        }
    }

    async updatePersonalCOmmission(req, res, next) {
        try {
            const { userId, newCommission } = req.body;
            const user = await User.findById(userId);
            user.personalCommission = newCommission;
            await user.save();
            return res.json(user);
        } catch (err) {
            next(err);
        }
    }

    async findUser(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await User.findById(userId);
            return res.json(user);
        } catch (err) {
            next(err);
        }
    }

    async getPostIndexes(req, res, next) {
        try {
            const indexes = await PostIndex.find();
            return res.json(indexes);
        } catch (err) {
            next(err);
        }
    }

    async addPostIndex(req, res, next) {
        try {
            const { index } = req.body;
            const indx = new PostIndex({ index });
            await indx.save();
            return res.json(indx);
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