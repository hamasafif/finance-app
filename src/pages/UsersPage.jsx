import { useEffect, useState } from "react";
import api from "../api/axios";
import { UserCog, Shield, Trash2, KeyRound, Save } from "lucide-react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const loadUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memuat user");
    } finally {
      setLoading(false);
    }
  };

  const changeRole = async (id, newRole) => {
    try {
      await api.put(`/users/${id}`, { role: newRole });
      loadUsers();
    } catch {
      alert("❌ Gagal mengubah role user");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Yakin hapus user ini?")) return;
    try {
      await api.delete(`/users/${id}`);
      loadUsers();
    } catch {
      alert("❌ Gagal menghapus user");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword) return setMessage("⚠️ Password baru wajib diisi.");

    try {
      setResetLoading(true);
      const res = await api.put(`/users/${selectedUser.id}/reset-password`, {
        newPassword,
      });
      setMessage(`✅ ${res.data.message}`);
      setTimeout(() => {
        setShowResetModal(false);
        setNewPassword("");
        setMessage("");
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Gagal reset password.");
    } finally {
      setResetLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading)
    return <p className="text-center py-10 text-gray-500">Memuat data...</p>;

  if (error)
    return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
        <UserCog className="text-indigo-600" /> Manajemen User
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="border p-3">ID</th>
              <th className="border p-3">Nama</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Role</th>
              <th className="border p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{u.id}</td>
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      u.role === "admin"
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() =>
                      changeRole(u.id, u.role === "admin" ? "user" : "admin")
                    }
                    className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md inline-flex items-center gap-1 text-xs"
                  >
                    <Shield size={14} />
                    {u.role === "admin" ? "Set User" : "Set Admin"}
                  </button>

                  <button
                    onClick={() => {
                      setSelectedUser(u);
                      setShowResetModal(true);
                    }}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md inline-flex items-center gap-1 text-xs"
                  >
                    <KeyRound size={14} /> Reset Password
                  </button>

                  <button
                    onClick={() => deleteUser(u.id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md inline-flex items-center gap-1 text-xs"
                  >
                    <Trash2 size={14} /> Hapus
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-gray-500 italic py-4"
                >
                  Tidak ada data user.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔒 Modal Reset Password */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 animate-fadeIn">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <KeyRound className="text-blue-600" /> Reset Password User
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              User: <strong>{selectedUser?.email}</strong>
            </p>

            <form onSubmit={handleResetPassword} className="space-y-4">
              <input
                type="password"
                placeholder="Masukkan password baru"
                className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />

              {message && (
                <p
                  className={`text-sm ${
                    message.startsWith("✅")
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {message}
                </p>
              )}

              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowResetModal(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={resetLoading}
                  className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 ${
                    resetLoading && "opacity-70 cursor-not-allowed"
                  }`}
                >
                  <Save size={16} />
                  {resetLoading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
