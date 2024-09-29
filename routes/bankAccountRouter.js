import { Router } from "express";

import bankAccountController from "../controllers/bankAccountController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = new Router();

router.post('/new-currency', bankAccountController.addCurrency);
router.post('/get-currencies', bankAccountController.getAllCurrencies);

router.get('/:userId', bankAccountController.getBankAccounts);
router.post('/add', bankAccountController.addBankAccount);
router.post('/transfer', bankAccountController.transfer);
router.delete('/:userId/:currencyCode', bankAccountController.deleteBankAccount);

export default router;