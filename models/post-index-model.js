import mongoose from "mongoose";

const postIndexSchema = new mongoose.Schema({
    index: {
        type: String,
    },
}, { timestamps: true });

const PostIndex = mongoose.model("postIndex", postIndexSchema);

export default PostIndex;