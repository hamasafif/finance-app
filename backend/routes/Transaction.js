import express from "express";
import { verifyToken, isAdmin } from "../middleware/auth.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import { Description } from "@headlessui/react";

const router = express.Router();

// ✅ USER: Tambah transaksi baru
router.post("/", verifyToken, async (req, res) => {
  try {
    const { type, description, amount, date } = req.body; // pakai 'desc' sesuai database

    if (!type || !amount || !date) {
      return res.status(400).json({ message: "Data transaksi tidak lengkap." });
    }

    const newTransaction = await Transaction.create({
      user_id: req.user.id, // otomatis dari token login
      type,
      description, // sesuai field DB
      amount,
      date,
    });

    res.status(201).json(newTransaction);
  } catch (err) {
    console.error("❌ Gagal simpan transaksi:", err);
    res.status(500).json({ message: "Gagal menyimpan transaksi." });
  }
});

// ✅ ADMIN: Lihat semua transaksi
router.get("/all", verifyToken, isAdmin, async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: [{ model: User, as: "User", attributes: ["id", "name", "email"] }],
      order: [["date", "DESC"]],
    });
    res.json(transactions);
  } catch (err) {
    console.error("❌ Gagal memuat transaksi:", err);
    res.status(500).json({ message: "Gagal memuat transaksi." });
  }
});

// ✅ USER: Lihat transaksi miliknya sendiri
router.get("/", verifyToken, async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { user_id: req.user.id },
      order: [["date", "DESC"]],
    });

    res.json(transactions);
  } catch (err) {
    console.error("❌ Gagal ambil transaksi user:", err);
    res.status(500).json({ message: "Gagal mengambil transaksi user." });
  }
});

// ✅ USER: Ambil summary transaksi (income, expense, saldo)
router.get("/summary", verifyToken, async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { user_id: req.user.id },
    });

    let total_income = 0;
    let total_expense = 0;

    transactions.forEach((t) => {
      if (t.type === "income") total_income += parseFloat(t.amount);
      else if (t.type === "expense") total_expense += parseFloat(t.amount);
    });

    const balance = total_income - total_expense;

    res.json({
      total_income,
      total_expense,
      balance,
    });
  } catch (err) {
    console.error("❌ Gagal menghitung summary:", err);
    res.status(500).json({ message: "Gagal menghitung data summary." });
  }
});

export default router;
