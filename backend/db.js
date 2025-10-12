import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // sesuaikan
  password: "", // sesuaikan
  database: "finance_app",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Gagal koneksi ke database:", err);
  } else {
    console.log("✅ Terhubung ke MySQL Database!");
  }
});

// ✅ Pastikan export default ditulis seperti ini:
export default db;
