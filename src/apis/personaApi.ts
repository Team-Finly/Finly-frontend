import { api } from "./client";

export const getMyPersona = async () => {
  
  const response = await api.get("/api/mypage/persona");
  return response.data.result; 
};