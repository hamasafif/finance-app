import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import InputData from "./pages/InputData";
import DataTransaksi from "./pages/DataTransaksi";
import Laporan from "./pages/Laporan";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Jika tidak login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Jika role tidak diizinkan
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Arahkan berdasarkan role
    return user.role === "admin" ? (
      <Navigate to="/admin" replace />
    ) : (
      <Navigate to="/dashboard" replace />
    );
  }

  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* ROOT redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* USER ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inputdata"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <InputData />
            </ProtectedRoute>
          }
        />
        <Route
          path="/datatransaksi"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <DataTransaksi />
            </ProtectedRoute>
          }
        />
        <Route
          path="/laporan"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Laporan />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 FALLBACK */}
        <Route path="*" element={<h1>404 | Halaman Tidak Ditemukan</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
