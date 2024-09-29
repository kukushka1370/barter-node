import ApiError from "../exceptions/ApiError.js";
import { Message, GroupChatMessage } from "../models/message-model.js";

class MessageService {
    async createMessage(chatId, senderId, text) {
        if (!chatId || !senderId) throw ApiError.BadRequest("Chat Id or sender is not specified");
        const msg = new Message({ chatId, senderId, text });
        await msg.save();
        return msg;
    }

    async getMessages(chatId) {
        if (!chatId) throw ApiError.BadRequest("Chat Id is not specified");
        const messages = await Message.find({ chatId });
        // console.log({ messages });
        return messages;
    }

    async getGroupChatMessages() {
        console.log("This message is from messageService 19")
        const groupMessages = await GroupChatMessage.find();
        console.log("Group chat messages :\n");
        // console.log({ groupMessages });
        return groupMessages;
    }

    async addGroupChatMessages(from, message) {
        console.log({ from, message })
        if (!from) throw ApiError.BadRequest("From is not specified");
        const msg = new GroupChatMessage({ from, message });
        console.log("Group chat message created :\n", msg);
        await msg.save();
        return msg;
    }
}

export default new MessageService();