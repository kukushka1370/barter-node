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
}

export default new StatsService();