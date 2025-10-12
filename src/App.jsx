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
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500 overflow-hidden">
        {/* SIDEBAR */}
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          <Header
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            setSidebarOpen={setSidebarOpen}
          />

          <main className="flex justify-center px-4 md:px-10 py-10">
            <div className="w-full max-w-7xl">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/data-transaksi" element={<DataTransaksi />} />
                <Route path="/input-data" element={<InputData />} />
                <Route path="/laporan" element={<Laporan />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}
