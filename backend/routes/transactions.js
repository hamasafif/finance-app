import express from "express";
import db from "../db.js";

const router = express.Router();

// GET all transactions
router.get("/", (req, res) => {
  db.query("SELECT * FROM transactions ORDER BY date DESC", (err, results) => {
    if (err) {
      console.error("❌ Error:", err);
      res.status(500).json({ message: "Gagal mengambil data" });
    } else {
      res.json(results);
    }
  });
});

// POST new transaction
router.post("/", (req, res) => {
  const { date, desc, type, amount } = req.body;
  if (!date || !desc || !type || !amount) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  const sql =
    "INSERT INTO transactions (date, `desc`, type, amount) VALUES (?, ?, ?, ?)";
  db.query(sql, [date, desc, type, amount], (err, result) => {
    if (err) {
      console.error("❌ Error saat insert:", err);
      res.status(500).json({ message: "Gagal menyimpan data" });
    } else {
      res.status(201).json({
        message: "✅ Data berhasil disimpan",
        id: result.insertId,
      });
    }
  });
});

router.get("/summary", (req, res) => {
  const sql = `
    SELECT 
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense,
      SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END) AS balance
    FROM transactions;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Gagal mengambil data ringkasan:", err);
      return res.status(500).json({ message: "Gagal mengambil data ringkasan" });
    }
    res.json(results[0]);
  });
});

export default router;
