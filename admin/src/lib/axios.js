import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

// Debug: Log API URL (remove in production after debugging)
console.log("VITE_API_URL:", apiUrl);

if (!apiUrl) {
  console.error("WARNING: VITE_API_URL is not set!");
}

const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

export default axiosInstance;
