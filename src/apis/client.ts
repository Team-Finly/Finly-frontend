import axios, { type AxiosRequestConfig } from 'axios';
import { tokenStorage } from '@/utils/tokenStorage';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});

interface QueueItem {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
  config: AxiosRequestConfig;
}

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
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
    const url = originalConfig.url;

    if (url?.includes('/auth/login')) {
      return Promise.reject(err);
    }

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
            headers: { 'Content-Type': 'application/json' },
          },
        );

        const newAccessToken = res.data.result?.accessToken;

        if (newAccessToken) {
          tokenStorage.set(newAccessToken);
          processQueue(null, newAccessToken);
          return api(originalConfig);
        } else {
          throw new Error('토큰 재발급 실패');
        }
      } catch (reissueError) {
        processQueue(reissueError, null);

        tokenStorage.remove();
        window.location.href = '/onboarding';

        return Promise.reject(reissueError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(err);
  },
);
