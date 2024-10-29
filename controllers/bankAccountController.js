import ApiError from "../exceptions/ApiError.js";
import BankAccount from "../models/bank-account-model.js";
import Credit from "../models/credit-model.js";
import Currency from "../models/currency-model.js";
import Transfer from "../models/transfer-model.js";
import bankAccountService from "../services/bankAccountService.js";
import userService from "../services/userService.js";

class BankAccountController {
    async createBankAccountCredit(req, res, next) {
        try {
            const { userId, amount, currencyCode, term } = req.body;
            const bA = await BankAccount.findOne({ userId, currencyCode, isCredit: true });

            if (bA) {
                throw ApiError.BadRequest(`Bank account already exists`);
            }

            const currency = await Currency.findOne({ currencyCode });
            if (!currency) throw ApiError.BadRequest(`Currency not found`);

            const newCredit = new BankAccount({
                userId,
                amount,
                currencyCode,
                currencySymbol: currency.symbol || "default",
                currencyName: currency.name || "default",
                term,
                isCredit: true,
            });
            await newCredit.save();
            return res.json(newCredit);
        } catch (err) {
            next(err);
        }
    }

    async freezeCredit(req, res, next) {
        try {
            const { creditId } = req.body;
            console.log({creditId})
            const credit = await BankAccount.findOne({ _id: creditId, isCredit: true });
            credit.isFreezed = true;
            await credit.save();
            return res.json(credit);
        } catch (err) {
            next(err);
        }
    }

    async getBankAccountCreditss(req, res, next) {
        try {
            const credits = await BankAccount.find({ isCredit: true });
            return res.json(credits);
        } catch (err) {
            next(err);
        }
    }

    async createCredit(req, res, next) {
        try {
            const { userId, bankId, amount, currencyCode } = req.body;
            const newCredit = new Credit({ userId, bankId, amount, currencyCode });
            newCredit.status = "approved";
            await newCredit.save();
            return res.json(newCredit);
        } catch (err) {
            next(err);
        }
    }

    async askForCredit(req, res, next) {
        try {
            const { userId, bankId, amount, currencyCode } = req.body;
            const newCredit = new Credit({ userId, bankId, amount, currencyCode });
            newCredit.status = "pending";
            await newCredit.save();
            return res.json(newCredit);
        } catch (err) {
            next(err);
        }
    }

    async findUserCredits(req, res, next) {
        try {
            const { userId } = req.params;
            const credits = await Credit.find({ userId });
            const credits2 = await Credit.find({ bankId: userId });
            return res.json({ credits, credits2 });
        } catch (err) {
            next(err);
        }
    }

    async approveOrDeclineCredit(req, res, next) {
        try {
            const { creditId, verdict } = req.body;
            if (verdict === false) {
                await Credit.findOneAndDelete({ _id: creditId });
            } else if (verdict === true) {
                const p = await Credit.findOne({ _id: creditId });
                p.status = "approved";
                await p?.save();
            }
            return res.json("ok!");
        } catch (err) {
            next(err);
        }
    }

    async getTransferHistory(req, res, next) {
        try {
            const { userId } = req.params;
            console.log({ userId })
            const userTransHistory = await Transfer.find({ userId });
            return res.json(userTransHistory);
        } catch (err) {
            next(err);
        }
    }

    async getAllTransfer(req, res, next) {
        try {
            const hist = await Transfer.find();
            return res.json(hist);
        } catch (err) {
            next(err);
        }
    }

    async addCurrency(req, res, next) {
        try {
            const { currencyCode, currencySymbol, name } = req.body;
            console.log({ currencyCode, currencySymbol, name })
            const bA = await Currency.findOne({ currencyCode });
            console.log(bA)
            if (bA) throw ApiError.BadRequest("Currency already exists");
            const newCurr = new Currency({ currencyCode, symbol: currencySymbol, name });
            await newCurr.save();
            return res.json(newCurr);
        } catch (err) {
            next(err);
        }
    }

    async getAllCurrencies(req, res, next) {
        try {
            const curr = await userService.getAllCurrencies();
            console.log({ curr })
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
            console.log({ bankAccounts })
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