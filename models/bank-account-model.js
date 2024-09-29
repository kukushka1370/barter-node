import mongoose from "mongoose";

const bankAccountSchema = new mongoose.Schema({
    amount: {
        type: Number,
        default: 0,
    },
    currencyCode: {
        type: String,
        default: "RUB",
    },
    currencyName: {
        type: String,
        default: "Рубли",
    },
    amountPurchases: {
        type: Number,
        default: 0,
    },
    amountSales: {
        type: Number,
        default: 0,
    },
    currencySymbol: {
        type: String,
        default: "₽",
    },
    curr: {
        type: String,
        default: "Russian Ruble",
    },
    userId: {
        type: String,
    },
    currencyId: {
        type: String,
    },
    nn: {
        type: String,
        default: "",
    },
}, { timestamps: true });

const BankAccount = mongoose.model("bank_account", bankAccountSchema);

export default BankAccount;