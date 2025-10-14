import { Users, FileText, BarChart3, LogOut } from "lucide-react";

export default function AdminSidebar({ current, onChange, onLogout }) {
  const menu = [
    { key: "users", label: "Users", icon: <Users size={18} /> },
    { key: "transactions", label: "Transactions", icon: <FileText size={18} /> },
    { key: "laporan", label: "Laporan", icon: <BarChart3 size={18} /> },
  ];

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-gray-100 shadow-xl flex flex-col transition-all duration-300">
      {/* Header */}
      <div className="p-5 border-b border-gray-700 flex items-center justify-center">
        <h1 className="text-xl font-bold text-indigo-400 tracking-wide">
          Admin Panel
        </h1>
      </div>

      {/* Menu Section */}
      <nav className="flex-1 p-4 space-y-1 mt-2">
        {menu.map((item) => {
          const isActive = current === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onChange(item.key)}
              className={`relative flex items-center w-full px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              {/* Active Indicator */}
              {isActive && (
                <span className="absolute left-0 top-0 h-full w-1 bg-indigo-400 rounded-r-md"></span>
              )}

              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer / Logout Section */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={onLogout}
          className="flex items-center justify-center w-full px-3 py-2 rounded-md text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-200"
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </button>
      </div>
    </aside>
  );
}
