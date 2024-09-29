import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
    totalMoney: {
        type: Number,
        default: 0,
    },
    systemCommission: {
        type: Number,
        default: 1,
    },
    investorCommission: {
        type: Number,
        default: 1,
    },
    managerCommission: {
        type: Number,
        default: 1,
    },
    systemCommissionMax: {
        type: Number,
        default: 0,
    },
    investorCommissionMax: {
        type: Number,
        default: 0,
    },
    managerCommissionMax: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

const Stats = mongoose.model("stats", statsSchema);

export default Stats;