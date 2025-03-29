import axios from "axios";
const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default axiosInstance;
