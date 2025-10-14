import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./db.js";

// Routes
import transactionRoutes from "./routes/Transaction.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/User.js"; // 🆕 route admin

dotenv.config();

const app = express();

// ✅ Konfigurasi CORS
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const allowedOrigins = [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://192.168.1.100:5173",
      "http://100.123.196.72:5173",
      "http://ubuntuserver.han-fence.ts.net",
    ];
    if (allowedOrigins.some(url => origin.startsWith(url))) {
      return callback(null, true);
    }
    return callback(new Error("CORS not allowed for this origin"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

app.use(express.json());

// ✅ Tes koneksi DB
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Terhubung ke MySQL Database (finance_app)");
  } catch (error) {
    console.error("❌ Gagal koneksi ke Database:", error);
  }
})();

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/users", userRoutes); // 🆕 admin route

app.get("/", (req, res) => {
  res.json({ message: "🚀 Finance App Backend Aktif dan Siap!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server berjalan di http://0.0.0.0:${PORT}`);
});
