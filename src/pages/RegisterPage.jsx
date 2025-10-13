import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../api";
import { UserPlus, Mail, Lock, User } from "lucide-react";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.post(`${API_BASE_URL}/auth/register`, {
      name,
      email,
      password,
    });
      setMessage("✅ Registrasi berhasil! Silakan login.");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Gagal mendaftar");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 sm:p-10 w-[90%] max-w-md relative overflow-hidden"
      >
        {/* Decorative bubbles */}
        <motion.div
          className="absolute -top-10 -left-10 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"
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
          <UserPlus className="text-purple-500" size={26} /> Buat Akun Baru
        </motion.h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          {/* Nama */}
          <div className="flex items-center border dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700 focus-within:ring-2 focus-within:ring-purple-500">
            <User className="text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Nama Lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full ml-2 bg-transparent outline-none text-gray-700 dark:text-gray-100"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center border dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700 focus-within:ring-2 focus-within:ring-purple-500">
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

          {/* Password */}
          <div className="flex items-center border dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700 focus-within:ring-2 focus-within:ring-purple-500">
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

          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-sm text-center font-medium ${
                message.includes("✅")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {message}
            </motion.p>
          )}

          {/* Tombol Register */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300 }}
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg font-semibold shadow-md transition"
          >
            Daftar
          </motion.button>
        </form>

        {/* Separator */}
        <div className="flex items-center justify-center my-4">
          <div className="h-px w-16 bg-gray-300 dark:bg-gray-600"></div>
          <span className="mx-2 text-gray-500 text-sm">atau</span>
          <div className="h-px w-16 bg-gray-300 dark:bg-gray-600"></div>
        </div>

        {/* Link ke login */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-700 dark:text-gray-300"
        >
          Sudah punya akun?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-purple-600 hover:text-purple-700 font-semibold underline"
          >
            Login Sekarang
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
