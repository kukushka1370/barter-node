import mongoose from "mongoose";

const transferSchema = new mongoose.Schema({
    amount: {
        type: String,
    },
    currencyFrom: {
        type: String,
    },
    currencyTo: {
        type: String,
    },
    userId: {
        type: String,
    },
    recepientId: {
        type: String
    },
}, { timestamps: true });

const Transfer = mongoose.model("transfer", transferSchema);

export default Transfer;