import Update from "../models/update-model.js";
import ApiError from "../exceptions/ApiError.js";
import BankAccount from "../models/bank-account-model.js";
import Currency from "../models/currency-model.js";
import Product from "../models/product-model.js";
import { User } from "../models/user-model.js";
import fileService from "./fileService.js";

class ProductService {
    async addProduct(name, price, description, quantity, img, category, article, website, userId, currencyCode) {
        console.log("servvvv")
        const product = await Product.findOne({ name });
        console.log(product);
        if (product) {
            throw ApiError.BadRequest(`Product ${name} already exists`);
        }

        let fileName = fileService.saveImg(img);
        console.log(fileName);

        // const curr = await Currency.findOne({ currencySymbol });
        // if (!curr) throw ApiError.BadRequest("not found currency");

        const productData = new Product({
            name,
            price,
            currency: currencySymbol,
            img: fileName,
            quantity,
            description,
            category,
            article,
            website,
            userId,
            currencyCode,
        });

        console.log({ productData });

        if (!productData) throw ApiError.BadRequest("Product data is not defined");
        // const temp = await BankAccount.findOne({ userId, curr: curr.name });
        // if (!temp) {
        //     const newBankcAccount = new BankAccount({ currencyCode: curr.currencyCode, currencySymbol, curr: curr.name, userId, currencyId: curr.id });
        //     await newBankcAccount.save();
        // }
        await productData.save();
        const upd = new Update({ msg: `Добавлен новый товар ${name} в количестве ${quantity} шт.` });
        await upd.save();

        console.log("Product has been successfully added!!");

        return productData;
    }

    async getAllProducts(limit, page) {
        page = page || 1;
        limit = limit || 9;

        let offset = page * limit - limit;
        let products = await Product.find();
        return { rows: products };
    }

    async getProductById(productId) {
        console.log("Heyyy", productId);
        const product = await Product.findOne({ _id: productId });
        // const owner = await User.findOne({where: {id: }});
        if (!product) {
            console.log(`Product not found with ID ${productId}`);
            return null;
        }
        console.log(product);
        const { userId } = product;
        console.log({ userId });
        const user = await User.findOne({ _id: userId });
        return {
            user,
            product,
        };
    }

    async removeOneProduct(productId) {
        const product = await Product.deleteOne({ _id: productId });
        return product;
    }
}

export default new ProductService();