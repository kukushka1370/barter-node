import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    members: {
        type: [String],
    },
}, { timestamps: true });

const Chat = mongoose.model("chat", chatSchema);

export default Chat;