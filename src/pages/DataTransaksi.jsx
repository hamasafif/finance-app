import { useEffect, useState } from "react";

const DataTransaksi = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error("❌ Gagal mengambil data transaksi:", err));
  }, []);

  // 🗓️ Format tanggal singkat (contoh: 10 Okt 2025)
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // 💰 Format angka ke Rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(angka) || 0);
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-neon-green">
        Data Transaksi
      </h1>

      {/* Wrapper scroll horizontal */}
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 dark:scrollbar-thumb-neon-green scrollbar-track-gray-200 dark:scrollbar-track-gray-800">
          <table className="min-w-full border-collapse text-sm sm:text-base table-auto">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-neon-green uppercase text-xs sm:text-sm sticky top-0 z-10">
                <th className="px-4 py-3 text-left whitespace-nowrap">
                  Tanggal
                </th>
                <th className="px-4 py-3 text-left whitespace-nowrap">
                  Keterangan
                </th>
                <th className="px-4 py-3 text-left whitespace-nowrap">Tipe</th>
                <th className="px-4 py-3 text-right whitespace-nowrap">
                  Jumlah (Rp)
                </th>
              </tr>
            </thead>

            <tbody>
              {transactions.length > 0 ? (
                transactions.map((t, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    {/* 📅 Kolom tanggal */}
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-300 whitespace-nowrap">
                      {formatDate(t.date)}
                    </td>

                    {/* 📝 Kolom keterangan */}
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300 break-words whitespace-normal">
                      {t.description || t.desc || "-"}
                    </td>

                    {/* 📊 Kolom tipe */}
                    <td
                      className={`px-4 py-3 font-semibold capitalize whitespace-nowrap ${
                        t.type?.toLowerCase() === "income" ||
                        t.type?.toLowerCase() === "pemasukan"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {t.type}
                    </td>

                    {/* 💵 Kolom jumlah */}
                    <td className="px-4 py-3 text-right text-gray-900 dark:text-gray-100 whitespace-nowrap font-semibold">
                      {formatRupiah(t.amount)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-4 text-gray-500 dark:text-gray-400"
                  >
                    Tidak ada data transaksi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic text-center sm:text-left">
        *Scroll ke kanan jika tabel tidak muat di layar
      </p>
    </div>
  );
};

export default DataTransaksi;
