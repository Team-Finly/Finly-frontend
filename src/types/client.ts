import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // ✅ 여기!
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

// (선택) 에러 공통 처리하고 싶으면 인터셉터도 여기서 추가
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // 네트워크/서버 에러 디버깅에 도움
    console.error("[API ERROR]", err?.response?.status, err?.response?.data);
    return Promise.reject(err);
  }
);
