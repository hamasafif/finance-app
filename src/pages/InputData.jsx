import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api";

const InputData = () => {
  const [type, setType] = useState("income");
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState(null);

  // Format angka ke format rupiah
  const formatRupiah = (value) => {
    if (!value) return "";
    const number = value.replace(/[^\d]/g, "");
    return new Intl.NumberFormat("id-ID").format(parseInt(number));
  };

  const handleAmountChange = (e) => {
    let value = e.target.value.replace(/[^\d]/g, "");
    if (value === "") setAmount("");
    else setAmount(formatRupiah(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanAmount = parseInt(amount.replace(/[^\d]/g, ""));

    try {
      await axios.post(`${API_BASE_URL}/transactions`, {
        type,
        desc,
        amount: cleanAmount,
        date,
      });

      setMessage({ type: "success", text: "✅ Data berhasil disimpan!" });
      setDesc("");
      setAmount("");
      setDate("");
    } catch (err) {
      console.error("❌ Gagal simpan data:", err);
      setMessage({ type: "error", text: "❌ Gagal menyimpan data!" });
    } finally {
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-green-400">
        Input Data
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md w-full sm:w-[500px] mx-auto relative"
      >
        {/* Jenis Transaksi */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            Jenis Transaksi
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="income">Pemasukan</option>
            <option value="expense">Pengeluaran</option>
          </select>
        </div>

        {/* Keterangan */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            Keterangan
          </label>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Misal: Gaji Bulanan"
            required
          />
        </div>

        {/* Jumlah */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            Jumlah (Rp)
          </label>
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-right font-semibold"
            placeholder="Contoh: 2.000.000"
            required
          />
        </div>

        {/* Tanggal */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            Tanggal
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Tombol Simpan */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
        >
          Simpan Data
        </button>

        {/* Pesan sukses / error */}
        {message && (
          <div
            className={`mt-3 p-3 rounded-md text-sm font-semibold text-center transition-all duration-500 ${
              message.type === "success"
                ? "bg-green-100 text-green-800 border border-green-400"
                : "bg-red-100 text-red-800 border border-red-400"
            }`}
          >
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
};

export default InputData;
