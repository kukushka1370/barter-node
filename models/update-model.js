import mongoose from "mongoose";

const updateSchema = new mongoose.Schema({
    msg: {
        type: String,
    },
}, { timestamps: true });

const Update = mongoose.model("update", updateSchema);

export default Update;