import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  Cell,
} from "recharts";

const Laporan = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/transactions")
      .then((res) => res.json())
      .then((transactions) => {
        const totalPemasukan = transactions
          .filter((t) => ["income", "pemasukan"].includes(t.type?.toLowerCase()))
          .reduce((sum, t) => sum + Number(t.amount || 0), 0);

        const totalPengeluaran = transactions
          .filter((t) => ["expense", "pengeluaran"].includes(t.type?.toLowerCase()))
          .reduce((sum, t) => sum + Number(t.amount || 0), 0);

        const saldo = totalPemasukan - totalPengeluaran;

        setData([
          { name: "Pemasukan", jumlah: totalPemasukan },
          { name: "Pengeluaran", jumlah: totalPengeluaran },
          { name: "Saldo", jumlah: saldo },
        ]);

        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Gagal ambil data laporan:", err);
        setLoading(false);
      });
  }, []);

  const formatRupiah = (angka) =>
    `Rp ${angka.toLocaleString("id-ID", {
      minimumFractionDigits: 0,
    })}`;

  // Warna cerah (dan kontras di dark mode)
  const COLORS = ["#00C49F", "#FF6384", "#3B82F6"];

  return (
    <div className="p-4 sm:p-6 animate-fadeIn">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-neon-green">
        Laporan Keuangan
      </h1>

      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-xl p-4 sm:p-6 transition-all duration-700 hover:shadow-2xl">
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Memuat data laporan...
          </p>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 20,
                  left: 10,
                  bottom: 20,
                }}
              >
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C49F" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#00C49F" stopOpacity={0.4} />
                  </linearGradient>
                  <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6384" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#FF6384" stopOpacity={0.4} />
                  </linearGradient>
                  <linearGradient id="saldoGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.4} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#555", fontSize: 12 }}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(value) => `${value / 1000000} jt`}
                  tick={{ fill: "#555", fontSize: 12 }}
                />
                <Tooltip
                  formatter={(value, name) => [
                    formatRupiah(Number(value)),
                    name,
                  ]}
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "none",
                    borderRadius: "10px",
                    color: "#f1f5f9",
                    fontSize: "13px",
                    padding: "10px 14px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  }}
                  cursor={{ fill: "rgba(0,0,0,0.05)" }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(value) => (
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      {value}
                    </span>
                  )}
                />
                <Bar
                  dataKey="jumlah"
                  animationDuration={1000}
                  animationBegin={200}
                  radius={[10, 10, 0, 0]}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.name === "Pemasukan"
                          ? "url(#incomeGradient)"
                          : entry.name === "Pengeluaran"
                          ? "url(#expenseGradient)"
                          : "url(#saldoGradient)"
                      }
                      style={{
                        filter:
                          "drop-shadow(0px 4px 6px rgba(0,0,0,0.15))",
                      }}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            {/* Ringkasan */}
            <div className="mt-6 text-center sm:text-left space-y-1">
              <p className="text-gray-800 dark:text-gray-300 text-sm sm:text-base">
                <strong>Pemasukan:</strong> {formatRupiah(data[0]?.jumlah || 0)}
              </p>
              <p className="text-gray-800 dark:text-gray-300 text-sm sm:text-base">
                <strong>Pengeluaran:</strong> {formatRupiah(data[1]?.jumlah || 0)}
              </p>
              <p className="text-gray-900 dark:text-neon-green font-bold text-base sm:text-lg mt-2">
                💰 Saldo Akhir: {formatRupiah(data[2]?.jumlah || 0)}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Laporan;
