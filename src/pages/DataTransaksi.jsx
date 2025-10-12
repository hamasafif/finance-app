import React from "react";
import { transactions } from "../data/dummy";

export default function DataTransaksi() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 dark:text-neon-green">Data Transaksi</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-x-auto transition-colors duration-500">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-neon-green">
            <tr>
              <th className="py-2 px-4">Tanggal</th>
              <th className="py-2 px-4">Keterangan</th>
              <th className="py-2 px-4">Tipe</th>
              <th className="py-2 px-4">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={i} className="border-t dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="py-2 px-4">{t.date}</td>
                <td className="py-2 px-4">{t.desc}</td>
                <td className={`py-2 px-4 font-semibold ${t.type === "income" ? "text-green-500" : "text-red-500"}`}>
                  {t.type === "income" ? "Pemasukan" : "Pengeluaran"}
                </td>
                <td className="py-2 px-4">{t.amount.toLocaleString("id-ID")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
