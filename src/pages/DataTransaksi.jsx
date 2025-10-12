import React from "react";
import { transactions } from "../data/dummy";

export default function DataTransaksi() {
  return (
    <div className="w-full">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800 dark:text-neon-green">
        Data Transaksi
      </h1>

      {/* Card Container */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-500">
        {/* Scroll Container */}
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-transparent">
          <table className="min-w-[720px] w-full text-sm md:text-base">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-neon-green uppercase text-xs md:text-sm">
              <tr>
                <th className="py-3 px-4 text-left">Tanggal</th>
                <th className="py-3 px-4 text-left">Keterangan</th>
                <th className="py-3 px-4 text-center">Tipe</th>
                <th className="py-3 px-4 text-right">Jumlah (Rp)</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((t, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                >
                  <td className="py-2 px-4 text-gray-700 dark:text-neon-green whitespace-nowrap">
                    {t.date}
                  </td>
                  <td className="py-2 px-4 text-gray-700 dark:text-neon-green">
                    {t.desc}
                  </td>
                  <td className="py-2 px-4 text-center font-semibold">
                    {t.type === "income" ? (
                      <span className="text-green-600 dark:text-neon-green">
                        Pemasukan
                      </span>
                    ) : (
                      <span className="text-red-500 dark:text-red-400">
                        Pengeluaran
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4 text-right text-gray-800 dark:text-neon-green font-medium">
                    {t.amount.toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-right italic">
        *Scroll ke samping jika tabel tidak muat di layar kecil
      </div>
    </div>
  );
}
