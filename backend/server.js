import express from "express";
import cors from "cors";
import transactions from "./routes/transactions.js";
import "./db.js";

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://192.168.1.100:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

app.use(express.json());
app.use("/api/transactions", transactions);

const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => 
  console.log(`✅ Server running at http://192.168.1.100:${PORT}`)
);
