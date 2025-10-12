import React from "react";
import { Sun, Moon, UserCircle2, Menu } from "lucide-react";

export default function Header({ darkMode, setDarkMode, setSidebarOpen }) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm flex items-center justify-between px-6 py-3 transition-colors duration-500">
      <div className="flex items-center gap-3">
        {/* Hamburger Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <Menu className="text-gray-700 dark:text-neon-green" size={20} />
        </button>
        <h1 className="font-semibold text-lg dark:text-neon-green hidden md:block">
          Finance Manager
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
        >
          {darkMode ? (
            <Sun className="text-neon-green" />
          ) : (
            <Moon className="text-gray-800" />
          )}
        </button>
        <div className="flex items-center gap-2 text-gray-700 dark:text-neon-green">
          <UserCircle2 size={30} />
          <span className="hidden sm:inline">Admin</span>
        </div>
      </div>
    </header>
  );
}
