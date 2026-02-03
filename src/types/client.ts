import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("[API ERROR]", err?.response?.status, err?.response?.data);
    return Promise.reject(err);
  }
);
