import axios, { type AxiosInstance } from "axios";

// V developmente: http://localhost:8000
// V produkcii: /api/ (použije sa nginx proxy na localhost:8000)
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.PROD 
    ? "/api" // Produkcia - nginx proxy na /api/
    : (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"), // Development
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
