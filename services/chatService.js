import Chat from "../models/chat-model.js";

class ChatService {
    async createChat(firstId, secondId) {
        const chat = await Chat.findOne({ members: { $all: [firstId, secondId] }, });
        if (chat) return chat;

        const newChat = await Chat.create({
            members: [firstId, secondId],
        });
        return newChat;
    }


    async findUserChats(userId) {
        const chats = await Chat.find({
            members: { $in: [userId] },
        });
        return chats;
    }

    async findChat(firstId, secondId) {
        const chat = await Chat.findOne({
            members: { $all: [firstId, secondId] },
        });
        return chat;
    }
}

export default new ChatService();