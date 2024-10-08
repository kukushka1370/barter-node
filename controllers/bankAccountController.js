import ApiError from "../exceptions/ApiError.js";
import Currency from "../models/currency-model.js";
import bankAccountService from "../services/bankAccountService.js";

class BankAccountController {
    async addCurrency(req, res, next) {
        try {
            const { currencyCode, currencySymbol, name } = req.body;
            const bA = await Currency.findOne({ currencyCode });
            console.log(bA)
            if (bA) throw ApiError.BadRequest("Currency already exists");
            const newCurr = new Currency({ currencyCode, currencySymbol, name });
            await newCurr.save();
            return res.json(newCurr);
        } catch (err) {
            next(err);
        }
    }

    async getAllCurrencies(req, res, next) {
        try {
            const curr = await Currency.find().lean().exec();
            console.log(curr)
            return res.json(curr);
        } catch (err) {
            next(err);
        }
    }

    async addBankAccount(req, res, next) {
        try {
            const { userId, currencyCode } = req.body;
            console.log(userId, currencyCode)
            const bankAccount = await bankAccountService.addBankAccount(userId, currencyCode);
            return res.json(bankAccount);
        } catch (e) {
            next(e);
        }
    }

    async getBankAccounts(req, res, next) {
        try {
            const { userId } = req.params;
            const bankAccounts = await bankAccountService.getBankAccounts(userId);
            console.log(bankAccounts);
            return res.json(bankAccounts);
        } catch (e) {
            next(e);
        }
    }

    async transfer(req, res, next) {
        try {
            const { bankAccountFromId, bankAccountToId, transferAmount } = req.body;
            console.log({ bankAccountFromId, bankAccountToId, transferAmount });
            const bankAccounts = await bankAccountService.transfer(bankAccountFromId, bankAccountToId, transferAmount);
            return res.json(bankAccounts);
        } catch (e) {
            next(e);
        }
    }

    async deleteBankAccount(req, res, next) {
        try {
            const { userId, currencyCode } = req.params;
            const result = await bankAccountService.deleteBankAccount(userId, currencyCode);
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }
}

export default new BankAccountController();