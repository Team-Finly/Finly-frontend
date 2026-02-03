import { api } from "./client";
import type { ApiResponse } from "../apis/types";

export type CheckEmailResult = { available: boolean };

export type LoginRequest = { email: string; password: string };
export type LoginResult = {
  accessToken: string;
  member: { memberId: number; email: string; nickname: string };
};

export type TermAgreement = { termId: number; agreed: boolean };
export type PersonaAnswer = { questionId: number; optionId: number };

export type SignupRequest = {
  email: string;
  password: string;
  nickname: string;
  termAgreements: TermAgreement[];
  personaAnswers: PersonaAnswer[];
};

export type SignupResult = {
  memberId: number;
  email: string;
  nickname: string;
  personaId: number;
};

export const authApi = {
  async checkEmail(email: string) {
    const res = await api.get<ApiResponse<CheckEmailResult>>("/auth/check-email", {
      params: { email },
    });
    return res.data;
  },

  async login(payload: LoginRequest) {
    const res = await api.post<ApiResponse<LoginResult>>("/auth/login", payload);
    return res.data;
  },

  async signup(payload: SignupRequest) {
    const res = await api.post<ApiResponse<SignupResult>>("/auth/signup", payload);
    return res.data;
  },
};
