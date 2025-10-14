import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";
import { motion } from "framer-motion";
import { Search, Calendar, Loader2 } from "lucide-react";

const DataTransaksi = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [error, setError] = useState("");

  // 🔹 Ambil transaksi user login
  const fetchTransactions = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.error("❌ Gagal mengambil data transaksi:", err);
      const msg =
        err.response?.data?.message ||
        (err.response?.status === 404
          ? "Endpoint transaksi tidak ditemukan di server."
          : "Gagal memuat data transaksi. Periksa koneksi backend.");
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // 🔍 Filter berdasarkan teks & tanggal
  const filteredData = transactions.filter((t) => {
    const desc =
      (t.description || t.desc || "").toString().toLowerCase();
    const matchText = desc.includes(search.toLowerCase());
    const matchDate = filterDate ? t.date.startsWith(filterDate) : true;
    return matchText && matchDate;
  });

  // 💰 Format rupiah
  const formatCurrency = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);

  // 📅 Format tanggal
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
          📋 Data Transaksi
        </h2>

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Calendar className="text-gray-500" size={18} />
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg p-2 w-full sm:w-1/3 dark:bg-gray-700">
            <Search className="text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Cari deskripsi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* Tabel Data */}
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          {loading ? (
            <div className="flex justify-center items-center py-10 text-gray-600 dark:text-gray-300">
              <Loader2 className="animate-spin mr-2" /> Memuat data...
            </div>
          ) : error ? (
            <p className="text-center py-10 text-red-500 dark:text-red-400">
              {error}
            </p>
          ) : filteredData.length === 0 ? (
            <p className="text-center py-10 text-gray-500 dark:text-gray-400">
              Tidak ada data transaksi ditemukan
            </p>
          ) : (
            <table className="w-full text-sm text-gray-700 dark:text-gray-300">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Tanggal</th>
                  <th className="py-3 px-4 text-left">Deskripsi</th>
                  <th className="py-3 px-4 text-center">Tipe</th>
                  <th className="py-3 px-4 text-right">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((t, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0
                        ? "bg-gray-50 dark:bg-gray-800/50"
                        : "bg-white dark:bg-gray-900/50"
                    } hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition`}
                  >
                    <td className="py-3 px-4">{formatDate(t.date)}</td>
                    <td className="py-3 px-4">{t.description || "-"}</td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          t.type === "income"
                            ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300"
                            : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300"
                        }`}
                      >
                        {t.type === "income" ? "Pemasukan" : "Pengeluaran"}
                      </span>
                    </td>
                    <td
                      className={`py-3 px-4 text-right font-semibold ${
                        t.type === "income"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {formatCurrency(t.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
    </Layout>
  );
};

export default DataTransaksi;
