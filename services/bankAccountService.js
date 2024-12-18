import ApiError from "../exceptions/ApiError.js";
import BankAccount from "../models/bank-account-model.js";
import Currency from "../models/currency-model.js";
import Stats from "../models/stats-model.js";
import Transfer from "../models/transfer-model.js";
import { User } from "../models/user-model.js";

class BankAccountService {
    async addBankAccount(userId, currencyCode) {
        console.log({ userId, currencyCode });
        const bA = await BankAccount.findOne({ userId, currencyCode });
        console.log(bA);
        if (bA) {
            throw ApiError.BadRequest(`Bank account already exists`);
        }
        const currency = await Currency.findOne({ currencyCode });
        if (!currency) throw ApiError.BadRequest(`Currency not found`);
        console.log("success", currency)
        const bankAccount = new BankAccount({
            userId,
            currencyCode,
            currencySymbol: currency.symbol || "default",
            currencyName: currency.name || "default",
        });
        await bankAccount.save();
        return bankAccount;
    }

    async getBankAccounts(userId) {
        const bankAccounts = await BankAccount.find({ userId });
        // console.log({ bankAccounts });
        return bankAccounts;
    }

    async transfer(bIdFrom, bIdTO, amo) {
        let amount = +amo;
        let convertedAmount = amount;
        let exchangeRate = 1;

        const firstStatsRecord = await Stats.findOne().sort({ createdAt: 1 });
        let obsomm = (firstStatsRecord.systemCommission / 100) * amount;
        let cmmm = (firstStatsRecord.managerCommission / 100) * amount;

        const bankAccountFrom = await BankAccount.findOne({ _id: bIdFrom });
        const personalCommission = await User.findOne({ _id: bankAccountFrom.userId });
        if (personalCommission && personalCommission.personalCommission !== 0) {
            obsomm = personalCommission.personalCommission;
        }
        const bankAccountTo = await BankAccount.findOne({ _id: bIdTO });
        if (!bankAccountFrom || !bankAccountTo) throw ApiError.BadRequest(`Bank Account not found`);
        if (bankAccountFrom?.amount < +amount) throw ApiError.BadRequest("Not enough money");

        const currencyFrom = await Currency.findOne({ currencyCode: bankAccountFrom.currencyCode });
        const currencyTo = await Currency.findOne({ currencyCode: bankAccountTo.currencyCode });
        if (!currencyFrom || !currencyTo) throw ApiError.BadRequest(`Currency not found`);

        const user1 = await User.findOne({ _id: bankAccountFrom.userId });
        const user2 = await User.findOne({ _id: bankAccountTo.userId });
        if (!user1 || !user2) throw ApiError.BadRequest("Error...");

        const manager1 = await User.findOne({ postcode: user1.postcode });
        const manager2 = await User.findOne({ postcode: user2.postcode });
        // if (!manager1 || !manager2) throw ApiError.BadRequest("Error...");
        if (!manager1 || !manager2) {
            let t = 0;
            if (manager1) t++;
            if (manager2) t++;
            const p = await BankAccount.findOne({ nn: "Банк" });
            console.log({ p });
            if (p) {
                const conv = this.getExchangeRate(currencyFrom.currencyCode.toUpperCase(), "RUB");
                console.log({ conv })
                p.amount += conv * cmmm * t;
                await p.save();
            }
        }

        if (manager1 || manager2) {
            const managerBA1 = await BankAccount.findOne({ userId: manager1._id, currencyCode: bankAccountFrom.currencyCode });
            const managerBA2 = await BankAccount.findOne({ userId: manager2._id, currencyCode: bankAccountFrom.currencyCode });

            let temp = 0;
            if (managerBA1) temp++;
            if (managerBA2) temp++;

            amount -= obsomm;
            console.log("========", obsomm, " ", amount, "=======")
            if (managerBA1) {
                managerBA1.amount += cmmm;
                await managerBA1.save();
            }
            if (managerBA2) {
                managerBA2.amount += cmmm;
                await managerBA2.save();
            }
        }

        console.log("=======================================");
        console.log(bankAccountFrom.currencyCode, bankAccountTo.currencyCode);
        console.log("=======================================");

        console.log(currencyFrom.currencyCode, "AND", currencyTo.currencyCode);

        if (currencyFrom.currencyCode !== currencyTo.currencyCode) {
            exchangeRate = this.getExchangeRate(currencyFrom.currencyCode.toUpperCase(), currencyTo.currencyCode.toUpperCase());
            convertedAmount = amount * exchangeRate;
            console.log({ convertedAmount, amount, exchangeRate })
        }

        if (currencyFrom.currencyCode === currencyTo.currencyCode) {
            convertedAmount = amount;
        }

        bankAccountFrom.amount -= +amount;
        bankAccountTo.amount += +convertedAmount;

        console.log("geggegegaiojoiajiojiofaioeg")
        await bankAccountFrom.save();
        await bankAccountTo.save();

        console.log("-=-=-=-=", bankAccountFrom.amount, " ", bankAccountTo.amount, "-=-=-=-=-");

        const internationalTransfer = bankAccountFrom?.userId !== bankAccountTo?.userId;

        const userBA = await BankAccount.find({ userId: bankAccountFrom.userId });

        const newTransferHistory = new Transfer({ userId: bankAccountFrom?._id, recepientId: bankAccountTo?._id, amount, currencyFrom: bankAccountFrom.currencyName, currencyTo: bankAccountTo.currencyName });

        await newTransferHistory.save();

        console.log("03u93f9f");

        return {
            internationalTransfer,
            bankAccountFrom,
            bankAccountTo,
            exchangeRate,
            userBA,
        };
    }

    async getAllCurrencies() {
        const curr = await Currency.find();
        console.log("{ curr }!!!!!!!!!")
        console.log({ curr })
        return curr;
    }

    getExchangeRate(fromCurrencyCode, toCurrencyCode) {
        console.log(fromCurrencyCode, toCurrencyCode);
        const exchangeRates = {
            'USD': { 'USD': 1, 'EUR': 0.84, 'RUB': 60.5, 'CNY': 6.9, 'GBP': 0.76, 'JPY': 110.2, 'AUD': 1.31, 'CAD': 1.29, 'CHF': 0.92, 'HKD': 7.85, 'SGD': 1.36 },
            'EUR': { 'EUR': 1, 'USD': 1.19, 'RUB': 72.1, 'CNY': 8.2, 'GBP': 0.90, 'JPY': 131.2, 'AUD': 1.56, 'CAD': 1.53, 'CHF': 1.09, 'HKD': 9.35, 'SGD': 1.62 },
            'RUB': { 'RUB': 1, 'USD': 0.016, 'EUR': 0.014, 'CNY': 0.11, 'GBP': 0.012, 'JPY': 1.83, 'AUD': 0.021, 'CAD': 0.021, 'CHF': 0.015, 'HKD': 0.13, 'SGD': 0.022 },
            'CNY': { 'CNY': 1, 'USD': 0.14, 'EUR': 0.12, 'RUB': 8.7, 'GBP': 0.11, 'JPY': 16.1, 'AUD': 0.19, 'CAD': 0.19, 'CHF': 0.13, 'HKD': 1.14, 'SGD': 0.20 },
            'GBP': { 'GBP': 1, 'USD': 1.32, 'EUR': 1.11, 'RUB': 82.2, 'CNY': 8.7, 'JPY': 144.9, 'AUD': 1.73, 'CAD': 1.69, 'CHF': 1.21, 'HKD': 10.35, 'SGD': 1.79 },
            'JPY': { 'JPY': 1, 'USD': 0.009, 'EUR': 0.0076, 'RUB': 0.55, 'CNY': 0.062, 'GBP': 0.0069, 'AUD': 0.012, 'CAD': 0.011, 'CHF': 0.0083, 'HKD': 0.071, 'SGD': 0.012 },
            'AUD': { 'AUD': 1, 'USD': 0.76, 'EUR': 0.64, 'RUB': 46.2, 'CNY': 5.2, 'GBP': 0.58, 'JPY': 84.1, 'CAD': 0.98, 'CHF': 0.70, 'HKD': 6.03, 'SGD': 1.03 },
            'CAD': { 'CAD': 1, 'USD': 0.77, 'EUR': 0.65, 'RUB': 46.9, 'CNY': 5.3, 'GBP': 0.59, 'JPY': 85.3, 'AUD': 1.02, 'CHF': 0.71, 'HKD': 6.06, 'SGD': 1.05 },
            'CHF': { 'CHF': 1, 'USD': 1.09, 'EUR': 0.92, 'RUB': 65.7, 'CNY': 6.3, 'GBP': 0.83, 'JPY': 120.3, 'AUD': 1.43, 'CAD': 1.39, 'HKD': 8.53, 'SGD': 1.47 },
            'HKD': { 'HKD': 1, 'USD': 0.13, 'EUR': 0.11, 'RUB': 7.7, 'CNY': 0.88, 'GBP': 0.097, 'JPY': 14.1, 'AUD': 0.17, 'CAD': 0.165, 'CHF': 0.12, 'SGD': 0.174 },
            'SGD': { 'SGD': 1, 'USD': 0.73, 'EUR': 0.62, 'RUB': 44.3, 'CNY': 5.1, 'GBP': 0.56, 'JPY': 81.5, 'AUD': 0.97, 'CAD': 0.95, 'CHF': 0.68, 'HKD': 5.75 },
        };

        if (!Object.keys(exchangeRates).includes(fromCurrencyCode)) throw ApiError.BadRequest("Exchange rate error");
        return exchangeRates[fromCurrencyCode][toCurrencyCode];
    }

    async deleteBankAccount(userId, currencyCode) {
        console.log({ userId, currencyCode })
        console.log(`deleting bankaccount`)
        if (currencyCode == "RUB") throw ApiError.BadRequest("Невозможно удалить этот счет");
        const status = await BankAccount.findOneAndDelete({ userId, currencyCode });
        return status;
    }
}

export default new BankAccountService();