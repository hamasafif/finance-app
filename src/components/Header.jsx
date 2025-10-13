import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, Sun, Moon } from "lucide-react";

const Header = ({ toggleSidebar }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [darkMode, setDarkMode] = useState(false);

  // 🔹 Load theme dari localStorage saat pertama kali
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  // 🔹 Toggle theme
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between bg-white dark:bg-gray-900 p-4 shadow-md rounded-xl mx-4 mt-4 transition-all duration-300 border border-gray-200 dark:border-gray-800"
    >
      {/* Kiri: tombol hamburger (mobile only) + sapaan */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <Menu size={22} className="text-gray-700 dark:text-gray-200" />
        </button>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-[#39FF14]">
          Selamat Datang, {user.name || "User"} 👋
        </h2>
      </div>

      {/* Kanan: toggle mode + tanggal */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-100 dark:bg-[#39FF14]/10 hover:scale-110 transition-transform duration-200"
        >
          {darkMode ? (
            <Sun size={20} className="text-[#39FF14]" />
          ) : (
            <Moon size={20} className="text-gray-600" />
          )}
        </button>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          {new Date().toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
