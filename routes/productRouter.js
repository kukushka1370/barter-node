import { Router } from "express";

import productController from "../controllers/productController.js";

const router = new Router();

router.post('/add-product', productController.addProduct);
router.get('/get-products', productController.getProducts);
router.get('/:productId', productController.getProductById);

export default router;