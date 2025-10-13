import express from "express";
import cors from "cors";
import transactions from "./routes/transactions.js";
import "./db.js"; // langsung panggil koneksi

const app = express();

// ✅ CORS lebih fleksibel: bisa dari LAN, localhost, atau domain
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const allowed = [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://192.168.1.100:5173",
      "http://100.123.196.72:5173",
      "http://ubuntuserver.han-fence.ts",
    ];
    if (allowed.some(url => origin.startsWith(url))) return callback(null, true);
    callback(new Error("CORS not allowed for this origin"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

app.use(express.json());
app.use("/api/transactions", transactions);

const PORT = 5000;

// ✅ listen ke semua interface (bisa diakses dari LAN / tunnel)
app.listen(PORT, "0.0.0.0", () =>
  console.log(`✅ Server running and accessible at http://0.0.0.0:${PORT}`)
);
