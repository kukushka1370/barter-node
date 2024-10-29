// import mongoose from "mongoose";

// const bankAccountCreditSchema = new mongoose.Schema({
//     amount: {
//         type: Number,
//         default: 0,
//     },
//     currencyCode: {
//         type: String,
//         default: "RUB",
//     },
//     currencyName: {
//         type: String,
//         default: "Рубли",
//     },
//     amountPurchases: {
//         type: Number,
//         default: 0,
//     },
//     amountSales: {
//         type: Number,
//         default: 0,
//     },
//     currencySymbol: {
//         type: String,
//         default: "₽",
//     },
//     srok: {
//         type: String,
//         default: "Месяц"
//     },
//     isFreezed: {
//         type: Boolean,
//         default: false,
//     },
//     curr: {
//         type: String,
//         default: "Russian Ruble",
//     },
//     userId: {
//         type: String,
//     },
//     currencyId: {
//         type: String,
//     },
// }, { timestamps: true });

// const BankAccountCredit = mongoose.model("bank_account_credit", bankAccountCreditSchema);

// export default BankAccountCredit;