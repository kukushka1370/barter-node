import chatService from "../services/chatService.js";

class ChatController {
    async createChat(req, res, next) {
        try {
            const { firstId, secondId } = req.body;
            const response = await chatService.createChat(firstId, secondId);
            return res.json(response);
        } catch (err) {
            next(err);
        }
    }

    async findUserChats(req, res, next) {
        try {
            const { userId } = req.params;
            const userChats = await chatService.findUserChats(userId);
            return res.json(userChats);
        } catch (err) {
            next(err);
        }
    }

    async findChat(req, res, next) {
        try {
            const { firstId, secondId } = req.params;
            const chat = await chatService.findChat(firstId, secondId);
            return res.json(chat);
        } catch (err) {
            next(err);
        }
    }
}

export default new ChatController();