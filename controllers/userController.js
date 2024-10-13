import Currency from "../models/currency-model.js";
import userService from "../services/userService.js";

class UserController {
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