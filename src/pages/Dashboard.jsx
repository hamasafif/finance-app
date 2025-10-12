import { useEffect, useState } from "react";
import { ArrowDownCircle, ArrowUpCircle, PiggyBank } from "lucide-react";

const Dashboard = () => {
  const [summary, setSummary] = useState({
    total_income: 0,
    total_expense: 0,
    balance: 0,
  });

  const [animated, setAnimated] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  // Format angka ke Rupiah
  const formatRupiah = (angka) => {
    if (isNaN(angka) || angka === null) return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(angka));
  };

  // Animasi angka smooth
  const animateValue = (key, target) => {
    const duration = 1000; // 1 detik
    const start = 0;
    const startTime = performance.now();

    const step = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const value = Math.floor(eased * (target - start) + start);
      setAnimated((prev) => ({ ...prev, [key]: value }));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  // Ambil data dari backend
  useEffect(() => {
    fetch("http://localhost:5000/api/transactions/summary")
      .then((res) => res.json())
      .then((data) => {
        const totals = {
          total_income: Number(data.total_income || 0),
          total_expense: Number(data.total_expense || 0),
          balance: Number(data.balance || 0),
        };
        setSummary(totals);
        animateValue("income", totals.total_income);
        animateValue("expense", totals.total_expense);
        animateValue("balance", totals.balance);
      })
      .catch((err) => console.error("❌ Gagal fetch summary:", err));
  }, []);

  // Komponen Card Panjang & Responsif
  const Card = ({ title, value, color, icon }) => {
    const formatted = formatRupiah(value);

    return (
      <div
        className={`w-full flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg border-l-8 ${color} px-4 sm:px-6 py-3 sm:py-4 transition-all duration-300`}
      >
        <div className="flex flex-col text-left w-full">
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-1">
            {title}
          </p>
          <h2
            className={`font-bold text-gray-900 dark:text-neon-green text-xl sm:text-2xl md:text-3xl tracking-tight leading-tight break-words`}
          >
            {formatted}
          </h2>
        </div>
        <div className="ml-3 flex-shrink-0">
          {icon}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Dashboard</h1>

      <div className="flex flex-col gap-4 sm:gap-6">
        <Card
          title="Pemasukan"
          value={animated.income}
          color="border-green-500"
          icon={<ArrowDownCircle className="text-green-500" size={32} />}
        />
        <Card
          title="Pengeluaran"
          value={animated.expense}
          color="border-red-500"
          icon={<ArrowUpCircle className="text-red-500" size={32} />}
        />
        <Card
          title="Saldo"
          value={animated.balance}
          color="border-blue-500"
          icon={<PiggyBank className="text-yellow-500" size={32} />}
        />
      </div>
    </div>
  );
};

export default Dashboard;
