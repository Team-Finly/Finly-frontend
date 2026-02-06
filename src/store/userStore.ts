import { create } from 'zustand';
import defaultProfileIcon from "@/assets/icons/profile.svg";

interface UserState {
  personaType: any;
  nickname: string;
  profileImage: string | null; 
  setUserInfo: (info: Partial<Omit<UserState, 'setUserInfo'>>) => void;
}

export const useUserStore = create<UserState>((set) => ({
  nickname: "조아", // 초기값
  profileImage: defaultProfileIcon,
  personaType: null,

  setUserInfo: (info) => set((state) => ({
    ...state,
    ...info,
  })),
}));