import mongoose from "mongoose";

const postIndexSchema = new mongoose.Schema({
    val: {
        type: String,
    },
}, { timestamps: true });

const PostIndex = mongoose.model("postIndex", postIndexSchema);

export default PostIndex;