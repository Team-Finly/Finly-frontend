import { api } from "./client";

export const getMyProfile = async () => {
  const response = await api.get("/api/mypage/me");
  return response.data.result;
};
export const getMyPersona = async () => {
  const response = await api.get("/api/mypage/persona");
  return response.data.result; 
};
export const updateNickname = async (nickname: string) => {
  const response = await api.post("/api/mypage/me/nickname", { nickname });
  return response.data; 
};
export const getUserMainProfile = async () => {
  const response = await api.get('/api/mypage');
  return response.data.result; 
};