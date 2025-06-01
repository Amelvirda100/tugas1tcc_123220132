import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // atau /api kalau kamu pakai prefix
});

export default api;
