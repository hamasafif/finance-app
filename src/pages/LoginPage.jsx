import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api, { API_BASE_URL } from "../api/axios";
import { LogIn, Mail, Lock } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🟢 Handle login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;

      if (!token || !user) throw new Error("Token tidak diterima dari server.");

      // ✅ Simpan token & data user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);
      localStorage.setItem("api_base", API_BASE_URL);

      console.log("✅ Login sukses:", user);

      // ✅ Redirect sesuai role
      if (user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      console.error("❌ Error login:", err);
      const msg =
        err.response?.data?.message ||
        (err.code === "ERR_NETWORK"
          ? "Server tidak dapat dihubungi. Coba lagi nanti."
          : "Email atau password salah.");
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-700">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 w-[90%] max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6 flex items-center justify-center gap-2">
          <LogIn size={26} className="text-blue-600" /> Masuk Akun
        </h2>

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700">
            <Mail size={18} className="text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full ml-2 bg-transparent outline-none text-gray-700 dark:text-gray-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div className="flex items-center border dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700">
            <Lock size={18} className="text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full ml-2 bg-transparent outline-none text-gray-700 dark:text-gray-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-center text-sm"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-lg font-semibold transition text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <div className="text-center mt-5 text-sm text-gray-600">
          Belum punya akun?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 font-semibold underline"
          >
            Daftar Sekarang
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
