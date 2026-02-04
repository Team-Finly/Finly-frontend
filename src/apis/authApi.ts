import { api } from "./client";

import type { 
  ApiResponse, 
  CheckEmailResult, 
  LoginRequest, 
  LoginResult, 
  SignupRequest, 
  SignupResult 
} from "../types/auth"; 

export const authApi = {
  // 1. 이메일 중복 체크 (GET 요청)
  async checkEmail(email: string) {
    const res = await api.get<ApiResponse<CheckEmailResult>>("/auth/check-email", {
      params: { email },
    });
    return res.data;
  },

  // 2. 로그인 (POST 요청)
  async login(payload: LoginRequest) {
    const res = await api.post<ApiResponse<LoginResult>>("/auth/login", payload);
    return res.data;
  },

  // 3. 회원가입 (POST 요청)
  async signup(payload: SignupRequest) {
    const res = await api.post<ApiResponse<SignupResult>>("/auth/signup", payload);
    return res.data;
  },
};