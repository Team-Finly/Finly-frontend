import { create } from 'zustand';
import defaultProfileIcon from "@/assets/icons/profile.svg";

interface UserState {
  nickname: string;
  profileImage: string; // 화면에 보여줄 이미지 URL
  setUserInfo: (info: { nickname?: string; profileImage?: string }) => void;
}

export const useUserStore = create<UserState>((set) => ({
  nickname: "조아", // 초기값
  profileImage: defaultProfileIcon,
  
  setUserInfo: (info) => set((state) => ({
    ...state,
    ...info,
  })),
}));