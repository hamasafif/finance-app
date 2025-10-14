import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// ✅ Middleware: Verifikasi token untuk semua user
export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    // Tidak ada header Authorization
    if (!authHeader) {
      return res.status(401).json({ message: "Token tidak ditemukan." });
    }

    // Format yang benar: Bearer <token>
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token tidak ditemukan atau format salah." });
    }

    // Verifikasi token JWT
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("❌ Token invalid:", err.message);
        return res.status(403).json({ message: "Token tidak valid atau sudah kedaluwarsa." });
      }

      // Simpan user ke req.user
      req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
        name: decoded.name,
      };

      next();
    });
  } catch (err) {
    console.error("❌ Error verifikasi token:", err);
    res.status(500).json({ message: "Gagal memverifikasi token." });
  }
};

// ✅ Middleware: Hanya untuk admin
export const isAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User tidak terautentikasi." });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Hanya admin yang boleh mengakses." });
    }

    next();
  } catch (err) {
    console.error("❌ Error pada isAdmin:", err);
    res.status(500).json({ message: "Terjadi kesalahan saat memverifikasi hak akses." });
  }
};
