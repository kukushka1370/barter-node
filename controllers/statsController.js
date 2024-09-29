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
            console.log({info})
            return res.json(info);
        } catch (err) {
            next(err);
        }
    }
}

export default new StatsController();