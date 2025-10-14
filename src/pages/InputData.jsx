import React, { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { API_BASE_URL } from "../api";
import { motion } from "framer-motion";
import { FilePlus } from "lucide-react";

const InputData = () => {
  const [form, setForm] = useState({
    date: "",
    description: "",
    type: "income",
    amount: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  // ✅ Update state & format nominal
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount") {
      const numericValue = value.replace(/\D/g, "");
      const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      setForm({ ...form, [name]: formattedValue });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // ✅ Kirim data ke backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post(
        `${API_BASE_URL}/transactions`,
        {
          ...form,
          amount: form.amount.replace(/\./g, ""), // hapus titik sebelum kirim
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Transaksi berhasil disimpan!");
      setForm({ date: "", description: "", type: "income", amount: "" });
    } catch (error) {
      console.error("❌ Gagal simpan transaksi:", error);
      setMessage("❌ Gagal menyimpan transaksi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-md mx-auto bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center gap-2 mb-4">
          <FilePlus size={24} className="text-indigo-600 dark:text-[#39FF14]" />
          <h2 className="text-xl font-bold text-gray-800 dark:text-[#39FF14] dark:neon-glow">
            Tambah Transaksi Baru
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tanggal */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-2">
              Tanggal Transaksi
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-[#39FF14] focus:ring-2 focus:ring-[#39FF14]/70 outline-none transition-all"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-2">
              Deskripsi
            </label>
            <input
              type="text"
              name="description"
              placeholder="Contoh: Gaji Bulanan / Beli Makan"
              value={form.description}
              onChange={handleChange}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-[#39FF14] placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-[#39FF14]/70 outline-none transition-all"
            />
          </div>

          {/* Jenis Transaksi */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-2">
              Jenis Transaksi
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-[#39FF14] focus:ring-2 focus:ring-[#39FF14]/70 outline-none transition-all"
            >
              <option value="income">Pemasukan</option>
              <option value="expense">Pengeluaran</option>
            </select>
          </div>

          {/* Nominal */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-2">
              Nominal (Rp)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500 dark:text-[#39FF14]">Rp</span>
              <input
                type="text"
                name="amount"
                placeholder="Masukkan jumlah"
                value={form.amount}
                onChange={handleChange}
                className="w-full pl-8 p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-[#39FF14] focus:ring-2 focus:ring-[#39FF14]/70 outline-none transition-all"
              />
            </div>
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 dark:bg-[#39FF14] hover:bg-indigo-700 dark:hover:bg-[#39FF14]/90 text-white dark:text-gray-900 font-semibold py-2 rounded-lg shadow transition-transform transform hover:scale-105"
          >
            {loading ? "Menyimpan..." : "Simpan Transaksi"}
          </button>
        </form>

        {/* Pesan sukses/gagal */}
        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.startsWith("✅")
                ? "text-green-600 dark:text-[#39FF14]"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </motion.div>
    </Layout>
  );
};

export default InputData;
