import axios from "axios";

const api = axios.create({
 // baseURL: "http://localhost:3000/api",
//  baseURL: "https://plabs-tasks-management-backend.onrender.com/api"
baseURL: "https://plabs-tasks-management-backend.onrender.com/api"
});

// Har request ke saath token automatically Authorization header me chala jayega
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;