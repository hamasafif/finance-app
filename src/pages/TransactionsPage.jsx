import { useEffect, useState } from "react";
import api from "../api/axios";
import { FileText, Filter, ArrowDownCircle, ArrowUpCircle } from "lucide-react";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTransactions = async () => {
    try {
      const res = await api.get("/transactions/all");
      setTransactions(res.data);
      setFiltered(res.data);

      // Buat daftar user unik untuk filter
      const uniqueUsers = [
        ...new Map(
          res.data.map((t) => [
            t.User?.id,
            { id: t.User?.id, name: t.User?.name || "Tidak diketahui" },
          ])
        ).values(),
      ];
      setUsers(uniqueUsers);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memuat transaksi.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (userId) => {
    setSelectedUser(userId);
    if (userId === "all") setFiltered(transactions);
    else setFiltered(transactions.filter((t) => t.User?.id === Number(userId)));
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  if (loading)
    return <p className="text-center py-10 text-gray-500">Memuat data...</p>;

  if (error)
    return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
          <FileText className="text-indigo-600" /> Semua Transaksi
        </h2>

        {/* Filter User */}
        <div className="flex items-center gap-2">
          <Filter className="text-gray-600" size={18} />
          <select
            value={selectedUser}
            onChange={(e) => handleFilter(e.target.value)}
            className="border rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Semua User</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="border p-3">Tanggal</th>
              <th className="border p-3">User</th>
              <th className="border p-3">Jenis</th>
              <th className="border p-3">Deskripsi</th>
              <th className="border p-3 text-right">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr
                key={t.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3">{t.date}</td>
                <td className="p-3">{t.User?.name || "-"}</td>
                <td className="p-3 flex items-center gap-2">
                  {t.type === "income" ? (
                    <>
                      <ArrowUpCircle size={16} className="text-green-600" />
                      <span className="text-green-700 font-medium">Pemasukan</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownCircle size={16} className="text-red-600" />
                      <span className="text-red-700 font-medium">Pengeluaran</span>
                    </>
                  )}
                </td>
                <td className="p-3">{t.description || "-"}</td>
                <td
                  className={`p-3 text-right font-semibold ${
                    t.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  Rp {Number(t.amount).toLocaleString("id-ID")}
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="p-4 text-center text-gray-500 italic"
                >
                  Tidak ada transaksi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
