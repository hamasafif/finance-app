import express from "express";
import cors from "cors";
import transactions from "./routes/transactions.js";
import "./db.js"; // langsung panggil koneksi

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/transactions", transactions);

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
