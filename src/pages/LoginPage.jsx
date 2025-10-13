import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../api";
import { LogIn, Mail, Lock } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_BASE_URL.replace("/api", "")}/api/auth/login`,
        { email, password }
      );
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 sm:p-10 w-[90%] max-w-md relative overflow-hidden"
      >
        {/* Decorative circles */}
        <motion.div
          className="absolute -top-10 -left-10 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        {/* Title */}
        <motion.h2
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white flex items-center justify-center gap-2"
        >
          <LogIn className="text-blue-500" size={26} /> Masuk Akun
        </motion.h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div className="flex items-center border dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700 focus-within:ring-2 focus-within:ring-blue-500">
            <Mail className="text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full ml-2 bg-transparent outline-none text-gray-700 dark:text-gray-100"
              required
            />
          </div>

          <div className="flex items-center border dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700 focus-within:ring-2 focus-within:ring-blue-500">
            <Lock className="text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full ml-2 bg-transparent outline-none text-gray-700 dark:text-gray-100"
              required
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300 }}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold shadow-md transition"
          >
            Masuk
          </motion.button>
        </form>

        {/* Separator */}
        <div className="flex items-center justify-center my-4">
          <div className="h-px w-16 bg-gray-300 dark:bg-gray-600"></div>
          <span className="mx-2 text-gray-500 text-sm">atau</span>
          <div className="h-px w-16 bg-gray-300 dark:bg-gray-600"></div>
        </div>

        {/* Register Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-700 dark:text-gray-300"
        >
          Belum punya akun?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:text-blue-700 font-semibold underline"
          >
            Daftar Sekarang
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
