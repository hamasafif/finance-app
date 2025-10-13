import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api";

const DataTransaksi = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ gunakan API_BASE_URL agar fleksibel (auto dari api.js)
        const res = await axios.get(`${API_BASE_URL}/transactions`);
        setTransactions(res.data);
      } catch (err) {
        console.error("❌ Gagal mengambil data transaksi:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Format tanggal ke gaya Indonesia
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Format angka ke Rupiah
  const formatRupiah = (number) => {
    if (!number && number !== 0) return "-";
    return new Intl.NumberFormat("id-ID").format(number);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-green-400">
        Data Transaksi
      </h2>

      {/* Wrapper utama agar tabel bisa discroll dengan lancar */}
      <div
        className="w-full max-w-full overflow-x-scroll overflow-y-scroll rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
        style={{
          maxHeight: "70vh",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "thin",
        }}
      >
        {loading ? (
          <div className="flex justify-center items-center h-40 text-gray-500 dark:text-gray-400 italic">
            Memuat data transaksi...
          </div>
        ) : (
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
                      className={`p-3 font-semibold ${
                        t.type === "income"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {t.type === "income" ? "Pemasukan" : "Pengeluaran"}
                    </td>
                    <td className="p-3 text-right text-gray-900 dark:text-gray-100 font-medium whitespace-nowrap">
                      Rp {formatRupiah(t.amount)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Catatan bawah */}
      <p className="text-xs italic mt-2 text-gray-500 dark:text-gray-400 text-center">
        *Scroll ke kanan, kiri, atas, atau bawah jika tabel tidak muat di layar
      </p>
    </div>
  );
};

export default DataTransaksi;
