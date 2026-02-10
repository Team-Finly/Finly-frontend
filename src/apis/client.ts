import axios from "axios";
import { tokenStorage } from "@/utils/tokenStorage";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

api.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      if (prom.config.headers) {
        prom.config.headers['Authorization'] = `Bearer ${token}`;
         if (typeof prom.config.headers.set === 'function') {
            prom.config.headers.set('Authorization', `Bearer ${token}`);
         }
      }
      prom.resolve(api(prom.config));
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;
    const status = err?.response?.status;

    if (status === 401 && !originalConfig._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve,
            reject,
            config: originalConfig,
          });
        });
      }

      originalConfig._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(
          `${BASE_URL}/auth/reissue`,
          {},
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );

        const newAccessToken = res.data.result?.accessToken;

        if (newAccessToken) {
          tokenStorage.set(newAccessToken);
          
          if (originalConfig.headers) {
             originalConfig.headers['Authorization'] = `Bearer ${newAccessToken}`;
             if (typeof originalConfig.headers.set === 'function') {
                originalConfig.headers.set('Authorization', `Bearer ${newAccessToken}`);
             }
          }

          processQueue(null, newAccessToken);
          
          return api(originalConfig);
        }
      } catch (reissueError) {
        processQueue(reissueError, null);
        
        tokenStorage.remove();
        localStorage.clear();
        window.location.href = "/login";
        
        return Promise.reject(reissueError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(err);
  }
);