import User from "./User.js";
import Transaction from "./Transaction.js";

// Relasi antar model
User.hasMany(Transaction, { foreignKey: "user_id", as: "Transactions" });
Transaction.belongsTo(User, { foreignKey: "user_id", as: "User" });

export { User, Transaction };
