import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { TrendingUp, PieChart as PieIcon } from "lucide-react";

export default function ReportsPage() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0 });
  const [userStats, setUserStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const COLORS = ["#4ade80", "#f87171", "#60a5fa", "#fbbf24", "#a78bfa"];

  useEffect(() => {
    const loadReportData = async () => {
      try {
        const res = await api.get("/transactions/all");
        const data = res.data;

        // Total pemasukan & pengeluaran
        const income = data
          .filter((t) => t.type === "income")
          .reduce((sum, t) => sum + parseFloat(t.amount), 0);

        const expense = data
          .filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + parseFloat(t.amount), 0);

        setSummary({ income, expense });

        // Statistik per user
        const userMap = {};
        data.forEach((t) => {
          const userName = t.User?.name || "Tanpa Nama";
          if (!userMap[userName]) userMap[userName] = 0;
          userMap[userName] += parseFloat(t.amount);
        });

        const userStatsArr = Object.entries(userMap).map(([name, total]) => ({
          name,
          total,
        }));

        setUserStats(userStatsArr);
      } catch (err) {
        console.error("❌ Gagal memuat laporan:", err);
      } finally {
        setLoading(false);
      }
    };

    loadReportData();
  }, []);

  if (loading)
    return <p className="text-center py-10 text-gray-500">Memuat laporan...</p>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
          <TrendingUp className="text-indigo-600" /> Laporan Keuangan
        </h2>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center justify-center">
          <p className="text-gray-500">Total Pemasukan</p>
          <h3 className="text-3xl font-bold text-green-600">
            Rp {summary.income.toLocaleString("id-ID")}
          </h3>
        </div>
        <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center justify-center">
          <p className="text-gray-500">Total Pengeluaran</p>
          <h3 className="text-3xl font-bold text-red-600">
            Rp {summary.expense.toLocaleString("id-ID")}
          </h3>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="font-semibold mb-4 text-gray-700">
            Perbandingan Pemasukan & Pengeluaran
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[summary]}>
              <XAxis dataKey="name" hide />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#4ade80" name="Pemasukan" />
              <Bar dataKey="expense" fill="#f87171" name="Pengeluaran" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="font-semibold mb-4 text-gray-700 flex items-center gap-2">
            <PieIcon className="text-indigo-600" /> Distribusi Transaksi per User
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userStats}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={110}
                fill="#8884d8"
                dataKey="total"
              >
                {userStats.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
