// api/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.github.com", // Base URL GitHub API
  headers: {
    Accept: "application/vnd.github.v3+json",
    "X-GitHub-Api-Version": "2022-11-28",
  },
});

// Interceptor untuk menambahkan authorization jika diperlukan
axiosInstance.interceptors.request.use((config) => {
  // Contoh: Menambahkan token jika ada
  //   const token = localStorage.getItem("github_token");
  //   if (token) {
  config.headers.Authorization = `Bearer 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`;
  //   }
  return config;
});

export default axiosInstance;
