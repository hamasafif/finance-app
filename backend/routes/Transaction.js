import express from "express";
import Transaction from "../models/Transaction.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// ✅ Semua route dilindungi token
router.use(verifyToken);

// GET semua transaksi milik user
router.get("/", async (req, res) => {
  const transactions = await Transaction.findAll({
    where: { user_id: req.userId },
    order: [["date", "DESC"]],
  });
  res.json(transactions);
});

// POST transaksi baru
router.post("/", async (req, res) => {
  const { type, desc, amount, date } = req.body;
  const transaction = await Transaction.create({
    type,
    desc,
    amount,
    date,
    user_id: req.userId,
  });
  res.json(transaction);
});

// Summary per user
router.get("/summary", async (req, res) => {
  const user_id = req.userId;
  const all = await Transaction.findAll({ where: { user_id } });
  const total_income = all
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);
  const total_expense = all
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);
  const balance = total_income - total_expense;
  res.json({ total_income, total_expense, balance });
});

export default router;
