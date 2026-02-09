import { api } from "./client";
import type { MyPageMainData, ProfileDetailData, PersonaDetail } from "@/types/member";

export const getMyProfile = async (): Promise<ProfileDetailData> => {
  const response = await api.get("/api/mypage/me");
  return response.data.result;
};
export const getMyPersona = async (): Promise<PersonaDetail>=> {
  const response = await api.get("/api/mypage/persona");
  return response.data.result; 
};
export const updateNickname = async (nickname: string) => {
  const response = await api.post("/api/mypage/me/nickname", { nickname });
  return response.data; 
};
export const getUserMainProfile = async (): Promise<MyPageMainData> => {
  const response = await api.get('/api/mypage');
  return response.data.result; 
};
export const addProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post("/api/mypage/me/profile-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file); 

  const response = await api.put("/api/mypage/me/profile-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteProfileImage = async () => {
  const response = await api.delete("/api/mypage/me/profile-image");
  return response.data;
};