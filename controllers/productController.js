import productService from "../services/productService.js";

class ProductController {
    async addProduct(req, res, next) {
        try {
            const { name, price, description, quantity, category, article, website, userId, currencyCode } = req.body;
            console.log(typeof name, typeof price, typeof description, typeof quantity, typeof category, typeof article, typeof website);
            console.log(name, price, description, quantity, category, article, website, currencyCode);
            const { img } = req.files;
            console.log("Image", img);
            const product = await productService.addProduct(name, price, description, quantity, img, category, article, website, userId, currencyCode);
            return res.json(product);
        } catch (err) {
            next(err);
        }
    }

    async getProducts(req, res, next) {
        try {
            const products = await productService.getAllProducts();
            return res.json(products);
        } catch (err) {
            next(err);
        }
    }

    async getProductById(req, res, next) {
        try {
            const { productId } = req.params;
            console.log(`Product ID : ${productId}`);
            const product = await productService.getProductById(productId);
            return res.json(product);
        } catch (err) {
            next(err);
        }
    }
}

export default new ProductController();