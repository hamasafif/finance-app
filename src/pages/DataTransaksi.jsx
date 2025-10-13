import React, { useEffect, useState } from "react";
import axios from "axios";

const DataTransaksi = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/transactions");
        setTransactions(res.data);
      } catch (err) {
        console.error("❌ Gagal mengambil data transaksi:", err);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID").format(number);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-green-400">
        Data Transaksi
      </h2>

      {/* Wrapper utama agar scroll muncul di semua mode */}
      <div
        className="w-full max-w-full overflow-x-scroll overflow-y-scroll rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
        style={{
          maxHeight: "70vh",
          WebkitOverflowScrolling: "touch", // agar scroll lembut di iOS
          scrollbarWidth: "thin",
        }}
      >
        <table className="min-w-[900px] w-full border-collapse text-sm sm:text-base">
          <thead className="bg-gray-100 dark:bg-gray-700 sticky top-0 z-10">
            <tr className="text-left text-gray-700 dark:text-gray-200">
              <th className="p-3 whitespace-nowrap">TANGGAL</th>
              <th className="p-3 whitespace-nowrap">KETERANGAN</th>
              <th className="p-3 whitespace-nowrap">TIPE</th>
              <th className="p-3 whitespace-nowrap text-right">JUMLAH (RP)</th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-gray-900">
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-4 text-gray-500 dark:text-gray-400 italic"
                >
                  Tidak ada data transaksi
                </td>
              </tr>
            ) : (
              transactions.map((t, i) => (
                <tr
                  key={i}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="p-3 whitespace-nowrap text-gray-800 dark:text-gray-200">
                    {formatDate(t.date)}
                  </td>
                  <td className="p-3 text-gray-800 dark:text-gray-300 whitespace-nowrap">
                    {t.desc || "-"}
                  </td>
                  <td
                    className={`p-3 font-semibold ${t.type === "income"
                        ? "text-green-500"
                        : "text-red-500"
                      }`}
                  >
                    {t.type === "income" ? "Income" : "Expense"}
                  </td>
                  <td className="p-3 text-right text-gray-900 dark:text-gray-100 font-medium whitespace-nowrap">
                    Rp {formatRupiah(t.amount)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Catatan bawah */}
      <p className="text-xs italic mt-2 text-gray-500 dark:text-gray-400 text-center">
        *Scroll ke kanan, kiri, atas, atau bawah jika tabel tidak muat di layar
      </p>
    </div>
  );
};

export default DataTransaksi;
