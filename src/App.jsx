import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import InputData from "./pages/InputData";
import DataTransaksi from "./pages/DataTransaksi";
import Laporan from "./pages/Laporan";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard"; // 🆕 Tambahkan halaman admin

function App() {
  // Ambil data login dari localStorage
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");
  const role = userData ? JSON.parse(userData).role : null;

  return (
    <Router>
      <Routes>
        {/* ===================== AUTH ROUTES ===================== */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ===================== ADMIN ROUTES ===================== */}
        {token && role === "admin" && (
          <>
            <Route path="/admin" element={<AdminDashboard />} />
            {/* Redirect semua route lain ke admin */}
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </>
        )}

        {/* ===================== USER ROUTES ===================== */}
        {token && role === "user" && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inputdata" element={<InputData />} />
            <Route path="/datatransaksi" element={<DataTransaksi />} />
            <Route path="/laporan" element={<Laporan />} />
            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </>
        )}

        {/* ===================== GUEST (Belum Login) ===================== */}
        {!token && <Route path="*" element={<Navigate to="/login" replace />} />}
      </Routes>
    </Router>
  );
}

export default App;
