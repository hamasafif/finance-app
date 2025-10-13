import sequelize from "./db.js";
import "./models/User.js";
import "./models/Transaction.js";

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Database sinkron dengan semua model!");
  } catch (err) {
    console.error("❌ Gagal sinkronisasi database:", err);
  }
})();
