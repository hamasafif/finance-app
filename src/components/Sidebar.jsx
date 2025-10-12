import React, { useState } from "react";
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
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:static top-0 left-0 h-full z-50 transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64 bg-gradient-to-b from-blue-600 to-blue-800 dark:from-gray-900 dark:to-black text-white flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-blue-500">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💸</span>
            <span className="text-lg font-bold tracking-wide">PAYNOTE</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 hover:bg-blue-700 rounded"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 py-4">
          {menus.map((menu) => (
            <Link
              key={menu.name}
              to={menu.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-5 py-2 mx-2 my-1 rounded-md transition-all ${
                location.pathname === menu.path
                  ? "bg-blue-700 dark:bg-neon-green text-white dark:text-black"
                  : "hover:bg-blue-700 dark:hover:bg-gray-700"
              }`}
            >
              {menu.icon}
              <span>{menu.name}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="mt-auto p-4 border-t border-blue-500">
          <button className="w-full flex items-center justify-center gap-2 py-2 text-sm rounded-md bg-blue-900 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-600">
            <LogOut size={16} />
            <span>Keluar</span>
          </button>
        </div>
      </aside>
    </>
  );
}
