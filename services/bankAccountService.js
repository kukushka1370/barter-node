import ApiError from "../exceptions/ApiError.js";
import BankAccount from "../models/bank-account-model.js";
import Currency from "../models/currency-model.js";

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
        console.log({ bankAccounts });
        return bankAccounts;
    }

    async transfer(bIdFrom, bIdTO, amount) {
        const bankAccountFrom = await BankAccount.findOne({ _id: bIdFrom });
        const bankAccountTo = await BankAccount.findOne({ _id: bIdTO });
        if (!bankAccountFrom || !bankAccountTo) throw ApiError.BadRequest(`Bank Account not found`);

        console.log(bankAccountFrom.currencyCode, bankAccountTo.currencyCode);

        const currencyFrom = await Currency.findOne({ currencyCode: bankAccountFrom.currencyCode });
        const currencyTo = await Currency.findOne({ currencyCode: bankAccountTo.currencyCode });
        if (!currencyFrom || !currencyTo) throw ApiError.BadRequest(`Currency not found`);

        console.log(currencyFrom.currencyCode, " ", currencyTo.currencyCode)

        const exchangeRate = this.getExchangeRate(currencyFrom.code.toUpperCase(), currencyTo.code.toUpperCase());
        const convertedAmount = amount * exchangeRate;

        console.log("gegegeggegeg")

        if (bankAccountFrom?.amount < amount) throw ApiError.BadRequest("Not enough money");
        bankAccountFrom.amount -= amount;
        bankAccountTo.amount += convertedAmount;

        console.log("geggegegaiojoiajiojiofaioeg")
        await bankAccountFrom.save();
        await bankAccountTo.save();

        return {
            bankAccountFrom,
            bankAccountTo,
            exchangeRate,
        };
    }

    getExchangeRate(fromCurrencyCode, toCurrencyCode) {
        const exchangeRates = {
            'USD': { 'EUR': 0.84, 'RUB': 60.5 },
            'EUR': { 'USD': 1.19, 'RUB': 72.1 },
            'RUB': { 'USD': 0.016, 'EUR': 0.014 },
        };

        return exchangeRates[fromCurrencyCode][toCurrencyCode];
    }

    async deleteBankAccount(userId, currencyCode) {
        console.log({ userId, currencyCode })
        if (currencyCode == "RUB") throw ApiError.BadRequest("Невозможно удалить этот счет");
        const status = await BankAccount.findOneAndDelete({ userId, currencyCode });
        return status;
    }
}

export default new BankAccountService();