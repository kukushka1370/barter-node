import { Router } from "express";

import bankAccountController from "../controllers/bankAccountController.js";
import checkAuth from "../middleware/authMiddleware.js";
import userController from "../controllers/userController.js";

const router = new Router();

router.post('/new-currency', bankAccountController.addCurrency);
router.get('/get-currencies', userController.getAllCurrencies);

router.get('/get-user-transfers/:userId', bankAccountController.getTransferHistory);
router.get('/get-all-transfers', bankAccountController.getAllTransfer);

router.get('/:userId', bankAccountController.getBankAccounts);
router.post('/add', bankAccountController.addBankAccount);
router.post('/transfer', bankAccountController.transfer);
router.delete('/:userId/:currencyCode', bankAccountController.deleteBankAccount);

export default router;