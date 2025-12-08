import axios, { type AxiosInstance } from "axios";

// V developmente: http://localhost:3001
// V produkcii: /api/ (použije sa nginx proxy na localhost:3001)
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.PROD
    ? "/api" // Produkcia - nginx proxy na /api/
    : (import.meta.env.VITE_API_BASE_URL || "http://localhost:3001"), // Development
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
