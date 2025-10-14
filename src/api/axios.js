// src/api/axios.js
import axios from "axios";

// ✅ Auto-detect API Base URL
// Jika ada variabel lingkungan (Vite), gunakan itu
// Kalau tidak, fallback ke IP lokal / VPN aktif
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://100.123.196.72:5000/api";

// ✅ Inisialisasi axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Tambahkan token JWT otomatis sebelum setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Tangani error global (opsional tapi berguna)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Token tidak valid atau sudah kedaluwarsa.");
      localStorage.removeItem("token");
      // Opsional: redirect ke login otomatis
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
export { API_BASE_URL };
