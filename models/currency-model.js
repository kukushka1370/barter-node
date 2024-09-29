import mongoose from "mongoose";

const currencySchema = new mongoose.Schema({
    currencyCode: {
        type: String,
        default: "USD",
    },
    symbol: {
        type: String,
        default: "$",
    },
    name: {
        type: String,
        default: "United States Dollar",
    },
}, { timestamps: true });

const Currency = mongoose.model("currency", currencySchema);

export default Currency;