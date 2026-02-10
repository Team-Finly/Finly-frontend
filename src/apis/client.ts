import axios from "axios";
import { tokenStorage } from "@/utils/tokenStorage";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, 
});

api.interceptors.request.use(config => {
  const token = tokenStorage.get();
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

api.interceptors.response.use(
  res => res,
  err => {
    const status = err?.response?.status;

    if (status === 401) {
      tokenStorage.remove();
      window.location.replace("/login");
    }

    if (import.meta.env.DEV) {
      console.error("[API ERROR]", {
        status,
        url: err?.config?.url,
        method: err?.config?.method,
      });
    }

    return Promise.reject(err);
  }
);