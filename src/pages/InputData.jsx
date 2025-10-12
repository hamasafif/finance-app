import React, { useState } from "react";

export default function InputData() {
  const [form, setForm] = useState({
    type: "income",
    desc: "",
    amount: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Gagal menyimpan data.");
      const result = await res.json();
      setMessage("✅ Data berhasil disimpan ke server!");
      setForm({ type: "income", desc: "", amount: "", date: "" });
    } catch (err) {
      console.error(err);
      setMessage("❌ Gagal menghubungi server. Pastikan backend berjalan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-500">
        <h1 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-800 dark:text-neon-green text-center">
          Input Data
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Jenis Transaksi
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-neon-green focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="income">Pemasukan</option>
              <option value="expense">Pengeluaran</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Keterangan
            </label>
            <input
              type="text"
              name="desc"
              value={form.desc}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-neon-green focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Contoh: Gaji Bulanan"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Jumlah (Rp)
            </label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-neon-green focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Masukkan jumlah"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Tanggal
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-neon-green focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="pt-4 text-center">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 dark:bg-neon-green dark:hover:bg-green-400 text-white dark:text-black"
              }`}
            >
              {loading ? "Menyimpan..." : "Simpan Data"}
            </button>
          </div>

          {message && (
            <p
              className={`text-center mt-4 font-medium ${
                message.startsWith("✅")
                  ? "text-green-600 dark:text-neon-green"
                  : "text-red-500 dark:text-red-400"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
