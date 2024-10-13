import Currency from "../models/currency-model.js";
import { User } from "../models/user-model.js";

class UserService {
    async getAllUsers() {
        const users = await User.find();
        return users;
    }

    async getAllCurrencies() {
        const curr = await Currency.find();
        return curr;
    }

    async approveOrDecline(userId, approve = true) {
        console.log({ userId, approve });
        const user = await User.findOne({ _id: userId });
        user.isDemo = !approve;
        await user.save();
        const users = await User.find();
        console.log(user);
        return users;
    }
}

export default new UserService();