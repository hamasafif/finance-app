export default function AdminNavbar({ current, onChange }) {
  const menu = [
    { key: "users", label: "👥 Users" },
    { key: "transactions", label: "💰 Transactions" },
  ];

  return (
    <nav className="bg-white shadow flex justify-between items-center p-4">
      <h1 className="text-xl font-bold text-indigo-600">Admin Dashboard</h1>
      <div className="space-x-4">
        {menu.map((item) => (
          <button
            key={item.key}
            onClick={() => onChange(item.key)}
            className={`px-4 py-2 rounded ${
              current === item.key
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
