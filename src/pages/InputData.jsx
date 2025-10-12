import React, { useState } from "react";

export default function InputData() {
  const [form, setForm] = useState({ type: "income", desc: "", amount: "", date: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data baru:", form);
    alert("Data tersimpan (dummy).");
    setForm({ type: "income", desc: "", amount: "", date: "" });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 dark:text-neon-green">Input Data</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4 max-w-lg transition-colors duration-500"
      >
        <div>
          <label className="block mb-1 font-medium dark:text-neon-green">Jenis Transaksi</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-neon-green"
          >
            <option value="income">Pemasukan</option>
            <option value="expense">Pengeluaran</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium dark:text-neon-green">Keterangan</label>
          <input
            type="text"
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-neon-green"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium dark:text-neon-green">Jumlah (Rp)</label>
          <input
            type="number"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: parseInt(e.target.value) })}
            className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-neon-green"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium dark:text-neon-green">Tanggal</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-neon-green"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 dark:bg-neon-green text-white dark:text-black px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-green-400 transition-all"
        >
          Simpan Data
        </button>
      </form>
    </div>
  );
}
