import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    price: {
        type: String,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    quantity: {
        type: String,
    },
    article: {
        type: String,
    },
    website: {
        type: String,
    },
    img: {
        type: String,
    },
    userId: {
        type: String,
    },
    currencyCode: {
        type: String,
        default: "RUB",
    },
}, { timestamps: true });

const Product = mongoose.model("product", productSchema);

export default Product;