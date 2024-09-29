import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chatId: {
        type: String,
    },
    senderId: {
        type: String,
    },
    text: {
        type: String,
    },
}, { timestamps: true });

const groupChatMessageSchema = new mongoose.Schema({
    from: {
        type: String,
    },
    message: {
        type: String,
    },
}, { timestamps: true });

const Message = mongoose.model("message", messageSchema);
const GroupChatMessage = mongoose.model("group_chat_message", groupChatMessageSchema);

export {
    Message,
    GroupChatMessage,
};