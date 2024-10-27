import { User } from "../models/user-model.js";
import statsService from "../services/statsService.js";

class StatsController {
    async getStatistics(_, res, next) {
        try {
            const info = await statsService.getStatistics();
            return res.json(info);
        } catch (err) {
            next(err);
        }
    }

    async updateTotalMoney(req, res, next) {
        try {
            const { updatedMoney } = req.body;
            console.log(updatedMoney)
            const info = await statsService.updateTotalMoney(updatedMoney);
            console.log({ info })
            return res.json(info);
        } catch (err) {
            next(err);
        }
    }

    async updateCommission(req, res, next) {
        try {
            const { commission } = req.body;
            console.log({ commission })
            const info = await statsService.updateCommission(commission);
            console.log({ info })
            return res.json(info);
        } catch (err) {
            next(err);
        }
    }

    async updateCommissionForSingleUser(req, res, next) {
        try {
            const { commission, userId } = req.body;
            console.log({ commission });
            const user = await User.findOne({ _id: userId });
            user.personalCommission = commission;
            await user.save();
            // const info = await statsService.updateCommission(commission);
            // console.log({ info })
            return res.json(user);
        } catch (err) {
            next(err);
        }
    }

    async updateMax(req, res, next) {
        try {
            const { max } = req.body;
            console.log({ max })
            const info = await statsService.updateMax(max);
            console.log({ info })
            return res.json(info);
        } catch (err) {
            next(err);
        }
    }
}

export default new StatsController();