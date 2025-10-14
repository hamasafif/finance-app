import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import UsersPage from "./UsersPage";
import TransactionsPage from "./TransactionsPage"; // ✅ pastikan ini ada
import ReportsPage from "./ReportsPage";

export default function AdminDashboard() {
  const [page, setPage] = useState("users");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;

    if (!user || user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

const renderPage = () => {
  switch (page) {
    case "users":
      return <UsersPage />;
    case "transactions":
      return <TransactionsPage />;
    case "laporan": // ✅ tambahkan ini
      return <ReportsPage />;
    default:
      return (
        <div className="bg-white rounded-xl shadow p-6 text-gray-600">
          Halaman <strong>{page}</strong> masih dalam pengembangan.
        </div>
      );
  }
};

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      <AdminSidebar current={page} onChange={setPage} onLogout={handleLogout} />
      <div className="ml-64 flex-1 p-8">{renderPage()}</div>
    </div>
  );
}