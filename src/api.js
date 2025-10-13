// src/api.js
const getApiBaseUrl = () => {
  const { hostname, protocol } = window.location;

  // Jika frontend diakses via domain / tunnel publik
  if (hostname.includes("han-fence.ts") || hostname.startsWith("100.")) {
    return `${protocol}//${hostname}:5000/api`;
  }

  // Jika frontend diakses via LAN
  if (hostname.startsWith("192.168.")) {
    return `${protocol}//${hostname}:5000/api`;
  }

  // Jika sedang development di localhost
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "http://localhost:5000/api";
  }

  // Fallback terakhir (misalnya production di domain resmi)
  return `${protocol}//${hostname}/api`;
};

export const API_BASE_URL = getApiBaseUrl();
