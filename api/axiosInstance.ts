import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.github.com", // Base URL GitHub API
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
});

// Interceptor to add authorization if needed
axiosInstance.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  // Only add the Authorization header if the token exists
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
