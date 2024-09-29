import Update from "../models/update-model.js";

class UpdateController {
    async getLatestUpdates(req, res, next) {
        try {
            const latestUpdates = await Update.find().sort({ createdAt: -1 }).limit(40);
            return res.json(latestUpdates);
        } catch (err) {
            next(err);
        }
    }
}

export default new UpdateController();