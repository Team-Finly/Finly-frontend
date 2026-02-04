import axios, { type InternalAxiosRequestConfig } from "axios";
import { tokenStorage } from "@/utils/tokenStorage";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;



export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});


api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => { 
    const token = tokenStorage.get();

    if (token) {
      config.headers = config.headers || {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {

    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (import.meta.env.DEV) {
      console.error("[API ERROR]", err?.response?.status, err?.response?.data);
    } else {
      console.error("[API ERROR]", err?.response?.status);
    }
    return Promise.reject(err);
  }
);