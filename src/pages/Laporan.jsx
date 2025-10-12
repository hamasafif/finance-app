import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { transactions } from "../data/dummy";

export default function Laporan() {
  const income = transactions.filter((t) => t.type === "income").reduce((a, b) => a + b.amount, 0);
  const expense = transactions.filter((t) => t.type === "expense").reduce((a, b) => a + b.amount, 0);

  const data = [
    { name: "Pemasukan", value: income },
    { name: "Pengeluaran", value: expense },
  ];

  const COLORS = ["#00C49F", "#FF4444"];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 dark:text-neon-green">Laporan Keuangan</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-500">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={100} label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
