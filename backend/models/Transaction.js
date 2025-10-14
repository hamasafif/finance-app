import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from "./User.js";

const Transaction = sequelize.define("Transaction", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  type: { type: DataTypes.ENUM("income", "expense"), allowNull: false },
  description: { type: DataTypes.TEXT },
  amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
});

// ✅ Hubungkan relasi
Transaction.belongsTo(User, { foreignKey: "user_id", as: "User" });
User.hasMany(Transaction, { foreignKey: "user_id", as: "Transactions" });

export default Transaction;
