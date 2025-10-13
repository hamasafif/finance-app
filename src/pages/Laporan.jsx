import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { API_BASE_URL } from "../api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const COLORS = ["#4ade80", "#f87171"]; // Hijau untuk income, Merah untuk expense

const Laporan = () => {
  const [chartData, setChartData] = useState([]);
  const [summary, setSummary] = useState({ total_income: 0, total_expense: 0 });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data;

      // 🔹 Kelompokkan transaksi per bulan
      const grouped = {};
      data.forEach((t) => {
        const month = new Date(t.date).toLocaleString("id-ID", { month: "long", year: "numeric" });
        if (!grouped[month]) grouped[month] = { month, income: 0, expense: 0 };
        if (t.type === "income") grouped[month].income += parseFloat(t.amount);
        else grouped[month].expense += parseFloat(t.amount);
      });

      const formatted = Object.values(grouped);
      setChartData(formatted);

      // 🔹 Hitung total semua
      const total_income = formatted.reduce((a, b) => a + b.income, 0);
      const total_expense = formatted.reduce((a, b) => a + b.expense, 0);
      setSummary({ total_income, total_expense });
    } catch (error) {
      console.error("❌ Gagal mengambil data laporan:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const pieData = [
    { name: "Pemasukan", value: summary.total_income },
    { name: "Pengeluaran", value: summary.total_expense },
  ];

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
          📊 Laporan Keuangan
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-10 text-gray-600 dark:text-gray-300">
            <Loader2 className="animate-spin mr-2" /> Memuat data laporan...
          </div>
        ) : (
          <>
            {/* Ringkasan */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="p-5 bg-green-100 dark:bg-green-800/40 rounded-xl shadow text-center">
                <h3 className="text-gray-700 dark:text-gray-200 font-semibold mb-1">Total Pemasukan</h3>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  Rp {summary.total_income.toLocaleString("id-ID")}
                </p>
              </div>
              <div className="p-5 bg-red-100 dark:bg-red-800/40 rounded-xl shadow text-center">
                <h3 className="text-gray-700 dark:text-gray-200 font-semibold mb-1">Total Pengeluaran</h3>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  Rp {summary.total_expense.toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            {/* Grafik Batang */}
            <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-xl shadow mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
                Tren Keuangan Bulanan
              </h3>
              {chartData.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-6">
                  Belum ada data transaksi.
                </p>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="income" fill="#4ade80" name="Pemasukan" />
                    <Bar dataKey="expense" fill="#f87171" name="Pengeluaran" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Grafik Donat */}
            <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-xl shadow">
              <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
                Perbandingan Pemasukan & Pengeluaran
              </h3>
              {summary.total_income === 0 && summary.total_expense === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-6">
                  Belum ada data untuk ditampilkan.
                </p>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </>
        )}
      </motion.div>
    </Layout>
  );
};

export default Laporan;
