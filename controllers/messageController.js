import messageService from "../services/messageService.js";

class MessageController {
    async createMessage(req, res, next) {
        try {
            const { chatId, senderId, text } = req.body;
            const response = await messageService.createMessage(chatId, senderId, text);
            return res.json(response);
        } catch (err) {
            next(err);
        }
    }

    async getMessages(req, res, next) {
        try {
            const { chatId } = req.params;
            const messages = await messageService.getMessages(chatId);
            return res.json(messages);
        } catch (err) {
            next(err);
        }
    }

    async createGroupChatMessage(req, res, next) {
        try {
            const { from, message } = req.body;
            const response = await messageService.addGroupChatMessages(from, message);
            return res.json(response);
        } catch (err) {
            next(err);
        }
    }

    async getGroupChatMessages(req, res, next) {
        try {
            const messages = await messageService.getGroupChatMessages();
            return res.json(messages);
        } catch (err) {
            next(err);
        }
    }
}

export default new MessageController();