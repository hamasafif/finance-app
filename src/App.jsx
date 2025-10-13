import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import InputData from "./pages/InputData";
import DataTransaksi from "./pages/DataTransaksi";
import Laporan from "./pages/Laporan";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Pages */}
        {token ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inputdata" element={<InputData />} />
            <Route path="/datatransaksi" element={<DataTransaksi />} />
            <Route path="/laporan" element={<Laporan />} />
            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
