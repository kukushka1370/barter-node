import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    surname: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    isActivated: {
        type: Boolean,
        default: false,
    },
    activationLink: {
        type: String,
    },
    postcode: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    region: {
        type: String,
    },
    role: {
        type: [String],
        default: ["user"],
    },
    rating: {
        type: Number,
        default: 100,
    },
    referralLink: {
        type: String,
    },
    KMinviteLink: {
        type: String,
    },
    investorInviteLink: {
        type: String,
    },
    managerInviteLink: {
        type: String,
    },
    productSold: {
        type: Number,
        default: 0,
    },
    refferals: {
        type: [String],
        default: [],
    },
    isDemo: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
    },
    userId: {
        type: Number,
    }
}, { timestamps: true });

const User = mongoose.model("user", userSchema);
const Token = mongoose.model("token", tokenSchema);

export {
    User,
    Token,
};