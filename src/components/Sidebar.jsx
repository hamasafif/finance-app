import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, ListOrdered, PlusCircle, FileText, LogOut } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
<div className="min-h-screen w-64 bg-gradient-to-b from-blue-600 to-blue-800 dark:from-gray-900 dark:to-black text-white dark:text-[#39FF14] shadow-xl flex flex-col justify-between transition-all duration-300">
      {/* Logo / Brand */}
      <div>
        <div className="flex items-center gap-3 p-5 border-b border-blue-400/30 dark:border-[#39FF14]/20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4248/4248443.png"
            alt="logo"
            className="w-8 h-8 animate-pulse"
          />
          <h1 className="text-lg font-semibold tracking-wide">
            WR Junior <br />
            <span className="text-sm opacity-80">Finance</span>
          </h1>
        </div>

        {/* Menu */}
        <nav className="flex flex-col mt-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 transition-colors duration-300 
              ${
                isActive
                  ? "bg-blue-700 dark:bg-[#39FF14]/10 text-white dark:text-[#39FF14]"
                  : "text-gray-100 dark:text-gray-300 hover:bg-blue-700/60 dark:hover:bg-[#39FF14]/10"
              }`
            }
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/datatransaksi"
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 transition-colors duration-300 
              ${
                isActive
                  ? "bg-blue-700 dark:bg-[#39FF14]/10 text-white dark:text-[#39FF14]"
                  : "text-gray-100 dark:text-gray-300 hover:bg-blue-700/60 dark:hover:bg-[#39FF14]/10"
              }`
            }
          >
            <ListOrdered size={20} />
            Data Transaksi
          </NavLink>

          <NavLink
            to="/inputdata"
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 transition-colors duration-300 
              ${
                isActive
                  ? "bg-blue-700 dark:bg-[#39FF14]/10 text-white dark:text-[#39FF14]"
                  : "text-gray-100 dark:text-gray-300 hover:bg-blue-700/60 dark:hover:bg-[#39FF14]/10"
              }`
            }
          >
            <PlusCircle size={20} />
            Input Data
          </NavLink>

          <NavLink
            to="/laporan"
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 transition-colors duration-300 
              ${
                isActive
                  ? "bg-blue-700 dark:bg-[#39FF14]/10 text-white dark:text-[#39FF14]"
                  : "text-gray-100 dark:text-gray-300 hover:bg-blue-700/60 dark:hover:bg-[#39FF14]/10"
              }`
            }
          >
            <FileText size={20} />
            Laporan
          </NavLink>
        </nav>
      </div>

      {/* Logout */}
      <div className="p-5 border-t border-blue-400/30 dark:border-[#39FF14]/20">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-blue-700 dark:bg-[#39FF14]/20 dark:hover:bg-[#39FF14]/30 hover:bg-blue-800 py-2 rounded-lg transition-all"
        >
          <LogOut size={18} />
          <span className="font-medium">Keluar</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
