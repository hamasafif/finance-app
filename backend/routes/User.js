import express from "express";
import { verifyToken, isAdmin } from "../middleware/auth.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// ✅ Get semua user (admin only)
router.get("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role"],
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal memuat data user." });
  }
});

// ✅ Ubah role user
router.put("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan." });

    user.role = req.body.role || user.role;
    await user.save();

    res.json({ message: "Role user berhasil diubah." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengubah role user." });
  }
});

// ✅ Hapus user
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan." });

    await user.destroy();
    res.json({ message: "User berhasil dihapus." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menghapus user." });
  }
});

// ✅ Reset password (admin only)
router.put("/:id/reset-password", verifyToken, isAdmin, async (req, res) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword) return res.status(400).json({ message: "Password baru wajib diisi." });

    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan." });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: `Password untuk ${user.email} berhasil direset.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal reset password." });
  }
});

export default router;
