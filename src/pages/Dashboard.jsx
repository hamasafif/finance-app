import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { API_BASE_URL } from "../api";
import { motion } from "framer-motion";
import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";

const Dashboard = () => {
  const [summary, setSummary] = useState({
    total_income: 0,
    total_expense: 0,
    balance: 0,
  });

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const formatRupiah = (num) => {
    const parsed = parseFloat(num);
    if (isNaN(parsed)) return "Rp 0";
    return parsed.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
  };

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/transactions/summary`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSummary(res.data);
      } catch (error) {
        console.error("❌ Gagal mengambil data summary:", error);
      }
    };
    fetchSummary();
  }, [token]);

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        {/* Greeting */}

      {/* Summary Cards */}
<div className="grid grid-cols-1 gap-4">
  {/* Total Pemasukan */}
  <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 200 }}
    className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md border-t-4 border-green-500 dark:border-[#39FF14]"
  >
    <div className="flex flex-col items-center justify-center text-center space-y-1">
      <ArrowDownCircle size={28} className="text-green-500 dark:text-[#39FF14]" />
      <h3 className="text-gray-700 dark:text-gray-300 font-semibold text-sm">
        Total Pemasukan
      </h3>
      <p className="text-2xl font-bold text-green-600 dark:text-[#39FF14]">
        {formatRupiah(summary.total_income)}
      </p>
    </div>
  </motion.div>

  {/* Total Pengeluaran */}
  <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 200 }}
    className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md border-t-4 border-red-500 dark:border-red-400/70"
  >
    <div className="flex flex-col items-center justify-center text-center space-y-1">
      <ArrowUpCircle size={28} className="text-red-500 dark:text-red-400" />
      <h3 className="text-gray-700 dark:text-gray-300 font-semibold text-sm">
        Total Pengeluaran
      </h3>
      <p className="text-2xl font-bold text-red-600 dark:text-red-400">
        {formatRupiah(summary.total_expense)}
      </p>
    </div>
  </motion.div>

  {/* Saldo Sekarang */}
  <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 200 }}
    className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md border-t-4 border-blue-500 dark:border-[#39FF14]/60"
  >
    <div className="flex flex-col items-center justify-center text-center space-y-1">
      <Wallet size={28} className="text-blue-500 dark:text-[#39FF14]" />
      <h3 className="text-gray-700 dark:text-gray-300 font-semibold text-sm">
        Saldo Sekarang
      </h3>
      <p className="text-2xl font-bold text-blue-600 dark:text-[#39FF14]">
        {formatRupiah(summary.balance)}
      </p>
    </div>
  </motion.div>
</div>


        {/* Motivation Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-[#39FF14]/30 dark:to-[#39FF14]/10 rounded-xl text-white dark:text-[#39FF14] shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-2">
            💡 Tips Keuangan Hari Ini
          </h3>
          <p className="text-sm leading-relaxed dark:text-[#39FF14]/90">
            “Jangan hanya mencatat pengeluaran, tapi juga evaluasi setiap bulan.
            Dengan begitu kamu bisa melihat kemana uangmu benar-benar pergi.”
          </p>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default Dashboard;
