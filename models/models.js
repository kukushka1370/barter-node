// import { DataTypes } from "sequelize";
// import db from "../db.js";

// // const Product = db.define("product", {
// //     name: {
// //         type: DataTypes.STRING,
// //     },
// //     price: {
// //         type: DataTypes.STRING,
// //     },
// //     description: {
// //         type: DataTypes.STRING(1900),
// //     },
// //     category: {
// //         type: DataTypes.STRING,
// //     },
// //     quantity: {
// //         type: DataTypes.INTEGER,
// //     },
// //     article: {
// //         type: DataTypes.STRING,
// //     },
// //     website: {
// //         type: DataTypes.STRING,
// //     },
// //     img: {
// //         type: DataTypes.STRING,
// //     },
// // });

// // const Chat = db.define("chat", {
// //     members: {
// //         type: DataTypes.ARRAY(DataTypes.STRING),
// //     },
// // });

// // const GroupChatMessage = db.define("group_chat_message", {
// //     from: {
// //         type: DataTypes.STRING,
// //     },
// //     message: {
// //         type: DataTypes.STRING,
// //     },
// // });

// // const News = db.define("news", {
// //     news: {
// //         type: DataTypes.STRING,
// //     },
// // });

// // const Update = db.define("update", {
// //     msg: {
// //         type: DataTypes.STRING,
// //     },
// // });

// // const Message = db.define("message", {
// //     chatId: {
// //         type: DataTypes.STRING,
// //     },
// //     senderId: {
// //         type: DataTypes.STRING,
// //     },
// //     text: {
// //         type: DataTypes.STRING,
// //     },
// // });

// // const User = db.define("user", {
// //     id: {
// //         type: DataTypes.INTEGER,
// //         primaryKey: true,
// //         autoIncrement: true,
// //     },
// //     name: {
// //         type: DataTypes.STRING,
// //         allowNull: false,
// //     },
// //     surname: {
// //         type: DataTypes.STRING,
// //         allowNull: false,
// //     },
// //     email: {
// //         type: DataTypes.STRING,
// //         allowNull: false,
// //         unique: true,
// //     },
// //     password: {
// //         type: DataTypes.STRING,
// //         allowNull: false,
// //     },
// //     isActivated: {
// //         type: DataTypes.BOOLEAN,
// //         defaultValue: false,
// //     },
// //     activationLink: {
// //         type: DataTypes.STRING,
// //         allowNull: false,
// //     },
// //     postcode: {
// //         type: DataTypes.STRING,
// //         allowNull: false,
// //     },
// //     phoneNumber: {
// //         type: DataTypes.STRING,
// //     },
// //     region: {
// //         type: DataTypes.STRING,
// //     },
// //     role: {
// //         type: DataTypes.ARRAY(DataTypes.STRING),
// //         defaultValue: ["user"],
// //     },
// //     rating: {
// //         type: DataTypes.INTEGER,
// //         defaultValue: 100,
// //     },
// //     referralLink: {
// //         type: DataTypes.STRING,
// //     },
// //     KMinviteLink: {
// //         type: DataTypes.STRING,
// //     },
// //     investorInviteLink: {
// //         type: DataTypes.STRING,
// //     },
// //     managerInviteLink: {
// //         type: DataTypes.STRING,
// //     },
// // });

// // const BankAccount = db.define("bank_account", {
// //     amount: {
// //         type: DataTypes.INTEGER,
// //         defaultValue: 0,
// //     },
// //     currencyCode: {
// //         type: DataTypes.STRING,
// //         defaultValue: "USD",
// //     },
// //     currencySymbol: {
// //         type: DataTypes.STRING,
// //         defaultValue: "$",
// //     },
// //     curr: {
// //         type: DataTypes.STRING,
// //         defaultValue: "United States Dollar",
// //     },
// // });

// // const Currency = db.define("currencies", {
// //     currencyCode: {
// //         type: DataTypes.STRING,
// //         defaultValue: "USD",
// //     },
// //     symbol: {
// //         type: DataTypes.STRING,
// //         defaultValue: "$",
// //     },
// //     name: {
// //         type: DataTypes.STRING,
// //         defaultValue: "United States Dollar",
// //     },
// // });

// // const Token = db.define("refresh_token", {
// //     token: {
// //         type: DataTypes.STRING(700),
// //         allowNull: false,
// //     },
// // });

// // User.hasOne(Token);
// // Token.belongsTo(User);

// User.hasMany(BankAccount);
// BankAccount.belongsTo(User);

// Currency.hasMany(BankAccount);
// BankAccount.belongsTo(Currency);

// User.hasMany(Product);
// Product.belongsTo(User);

// export {
//     User,
//     Token,
//     BankAccount,
//     Currency,
//     Product,
//     Chat,
//     Message,
//     Update,
//     News,
//     GroupChatMessage,
// }