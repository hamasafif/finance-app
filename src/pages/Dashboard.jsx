import React from "react";
import Card from "../components/Card";
import { transactions } from "../data/dummy";

export default function Dashboard() {
  const income = transactions.filter((t) => t.type === "income").reduce((a, b) => a + b.amount, 0);
  const expense = transactions.filter((t) => t.type === "expense").reduce((a, b) => a + b.amount, 0);

  const stats = [
    { title: "Pemasukan", value: income, color: "border-green-400", icon: "⬇️" },
    { title: "Pengeluaran", value: expense, color: "border-red-400", icon: "⬆️" },
    { title: "Saldo", value: income - expense, color: "border-blue-400", icon: "💰" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl lg:text-4xl font-semibold mb-4 dark:text-neon-green">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {stats.map((s, i) => (
          <Card key={i} {...s} />
        ))}
      </div>
    </div>
  );
}
