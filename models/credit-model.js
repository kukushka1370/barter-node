import mongoose from "mongoose";

const creditSchema = new mongoose.Schema({
    bankId: {
        type: String,
    },
    userId: {
        type: String,
    },
    amount: {
        type: Number,
    },
    currencyCode: {
        type: String,
        default: "RUB",
    },
}, { timestamps: true });

const Credit = mongoose.model("credit", creditSchema);

export default Credit;