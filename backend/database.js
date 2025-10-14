// backend/database.js
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const {
  DB_HOST = "localhost",
  DB_USER = "root",
  DB_PASS = "",
  DB_NAME = "finance_app",
} = process.env;

(async () => {
  try {
    console.log("🚀 Memulai setup database...");

    // 1️⃣ Koneksi awal (tanpa DB) untuk membuat database
    const conn = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      multipleStatements: true,
    });

    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    console.log(`✅ Database "${DB_NAME}" siap.`);

    // 2️⃣ Koneksi ke database
    const db = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      multipleStatements: true,
    });

    // 3️⃣ Buat tabel Users
    await db.query(`
      CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('user', 'admin') DEFAULT 'user',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    console.log("✅ Tabel 'Users' siap.");

    // 4️⃣ Buat tabel Transactions
    await db.query(`
      CREATE TABLE IF NOT EXISTS Transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        type ENUM('income', 'expense') NOT NULL,
        description TEXT,
        amount DECIMAL(12,2) NOT NULL,
        date DATE NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    console.log("✅ Tabel 'Transactions' siap.");

    // 5️⃣ Buat admin default jika belum ada
    const [admins] = await db.query(`SELECT id FROM Users WHERE role = 'admin' LIMIT 1;`);
    if (!admins || admins.length === 0) {
      const hashed = await bcrypt.hash("admin123", 10);
      await db.query(
        `INSERT INTO Users (name, email, password, role)
         VALUES (?, ?, ?, ?);`,
        ["Administrator", "admin@financeapp.com", hashed, "admin"]
      );
      console.log("👑 Admin default dibuat: email=admin@financeapp.com | password=admin123");
    } else {
      console.log("ℹ️ Admin default sudah ada, lewati pembuatan.");
    }

    await db.end();
    await conn.end();
    console.log("🎉 Setup database selesai! Semua tabel sesuai struktur terbaru ✅");
  } catch (error) {
    console.error("❌ Gagal setup database:", error);
    process.exit(1);
  }
})();
