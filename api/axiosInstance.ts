import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.github.com", // Base URL GitHub API
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
});

// Interceptor to add authorization if needed
axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`;
  return config;
});

export default axiosInstance;
