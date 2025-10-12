import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import DataTransaksi from "./pages/DataTransaksi";
import InputData from "./pages/InputData";
import Laporan from "./pages/Laporan";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        <div className="flex-1 flex flex-col">
          <Header
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            setSidebarOpen={setSidebarOpen}
          />
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/data-transaksi" element={<DataTransaksi />} />
              <Route path="/input-data" element={<InputData />} />
              <Route path="/laporan" element={<Laporan />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
