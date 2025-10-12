import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Database,
  ArrowDownCircle,
  PieChart,
  LogOut,
  X,
} from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  const menus = [
    { name: "Dashboard", path: "/", icon: <Home size={18} /> },
    { name: "Data Transaksi", path: "/data-transaksi", icon: <Database size={18} /> },
    { name: "Input Data", path: "/input-data", icon: <ArrowDownCircle size={18} /> },
    { name: "Laporan", path: "/laporan", icon: <PieChart size={18} /> },
  ];

  return (
    <>
      {/* Overlay untuk mode mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full z-50 transition-transform duration-300 transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 w-64 md:w-60
        bg-gradient-to-b from-blue-600 to-blue-800
        dark:from-gray-900 dark:to-black
        text-white flex flex-col shadow-lg`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-blue-500 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💸</span>
            <span className="text-lg font-bold tracking-wide">WR Junior - Finance</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 hover:bg-blue-700 dark:hover:bg-gray-700 rounded transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu navigasi */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {menus.map((menu) => {
            const isActive = location.pathname === menu.path;
            return (
              <Link
                key={menu.name}
                to={menu.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-5 py-3 mx-3 my-1 rounded-md text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-700 dark:bg-neon-green text-white dark:text-black shadow-inner"
                      : "hover:bg-blue-700 dark:hover:bg-gray-800 text-gray-100 dark:text-gray-300"
                  }`}
              >
                {menu.icon}
                <span>{menu.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Tombol Keluar */}
        <div className="p-4 border-t border-blue-500 dark:border-gray-800">
          <button className="w-full flex items-center justify-center gap-2 py-2 text-sm rounded-md bg-blue-900 hover:bg-blue-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-300">
            <LogOut size={16} />
            <span>Keluar</span>
          </button>
        </div>
      </aside>
    </>
  );
}
