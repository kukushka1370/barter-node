import BankAccount from "../models/bank-account-model.js";
import Product from "../models/product-model.js";
import Stats from "../models/stats-model.js";
import { User } from "../models/user-model.js";

class StatsService {
    async getStatistics() {
        // console.log("heheuh");
        // const usersCount = await User.countDocuments();
        // console.log('users ', usersCount);
        // const productsCount = await Product.countDocuments();
        // console.log('products ', productsCount);
        // const totalQuantity = await Product.aggregate([{ $sum: 'quantity' }]);
        // console.log('quantity ', totalQuantity);

        // const stats = await Stats.findOne().sort({ createdAt: 1 });


        // const [usersCount, productsCount, totalQuantity, stats] = await Promise.all([
        //     User.countDocuments(),
        //     Product.countDocuments(),
        //     Product.aggregate([{ $sum: 'quantity' }]),
        //     Stats.findOne().sort({ createdAt: 1 }), // first one
        // ]);

        // console.log("Finito!");
        // console.log({
        //     usersCount,
        //     productsCount,
        //     totalQuantity,
        //     totalPrice,
        // });

        const firstStatsRecord = await Stats.findOne().sort({ createdAt: 1 });

        return firstStatsRecord;
        // return {
        //     usersCount,
        //     productsCount,
        //     totalQuantity,
        //     totalMoney: stats.totalMoney || 1,
        // };
    }


    async updateTotalMoney(money) {
        console.log({ money });
        const firstStatsRecord = await Stats.findOne().sort({ createdAt: 1 });
        firstStatsRecord.totalMoney += +money || 0;
        const bank = await BankAccount.findOne({ nn: "БАНК" });
        if (bank) {
            bank.amount += money;
        }
        // const n = new Stats({ totalMoney: money });
        // await n.save();
        console.log(firstStatsRecord);
        await firstStatsRecord.save();
        return firstStatsRecord;
    }

    async updateCommission(commission = []) {
        const firstStatsRecord = await Stats.findOne().sort({ createdAt: 1 });
        if (commission[0] && typeof +commission[0] == "number") firstStatsRecord.systemCommission = +commission[0];
        if (commission[1] && typeof +commission[1] == "number") firstStatsRecord.investorCommission = +commission[1];
        if (commission[2] && typeof +commission[2] == "number") firstStatsRecord.managerCommission = +commission[2];
        await firstStatsRecord.save();
        return firstStatsRecord;
    }

    async updateMax(max = []) {
        const firstStatsRecord = await Stats.findOne().sort({ createdAt: 1 });
        if (max[0] && typeof +max[0] == "number") firstStatsRecord.systemCommissionMax = +max[0];
        if (max[1] && typeof +max[1] == "number") firstStatsRecord.investorCommissionMax = +max[1];
        if (max[2] && typeof +max[2] == "number") firstStatsRecord.managerCommissionMax = +max[2];
        await firstStatsRecord.save();
        return firstStatsRecord;
    }
}

export default new StatsService();