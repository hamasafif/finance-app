import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// 🔧 Koneksi Sequelize ke MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME || "finance_app",
  process.env.DB_USER || "wrjunior",
  process.env.DB_PASS || "Hamas@fif13",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false,
  }
);

export default sequelize;
