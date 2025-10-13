import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config(); // 🔹 Memuat variabel dari file .env

// ✅ Gunakan environment variables dari .env
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "finance_app",
  port: process.env.DB_PORT || 3306,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Gagal koneksi ke database:", err.message);
  } else {
    console.log("✅ Terhubung ke MySQL Database:", process.env.DB_NAME);
  }
});

export default db;
