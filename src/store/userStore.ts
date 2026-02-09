import { create } from 'zustand';
import { getUserMainProfile, getMyProfile } from '@/apis/userApi'; 
import defaultProfileIcon from "@/assets/icons/profile.svg";
import type { PersonaKey } from "@/constants/mypersona";
const BASE_URL = import.meta.env.VITE_API_BASE_URL ;
interface UserState {
  memberId: number;
  nickname: string;
  email: string;
  profileImage: string | null;
  personaType: PersonaKey | null;
  mindScore: number;      
  fragmentCount: number;
  isLoading: boolean;


  fetchMainProfile: () => Promise<void>;   
  fetchDetailProfile: () => Promise<void>;
  
  setUserInfo: (info: Partial<UserState>) => void;
  clearUser: () => void;
}

// 초기값
const initialState = {
  memberId: 0,
  nickname: "",
  email: "",
  profileImage: defaultProfileIcon,
  personaType: null,
  mindScore: 0,
  fragmentCount: 0,
  isLoading: false,
};

export const useUserStore = create<UserState>((set) => ({
  ...initialState,
  setUserInfo: (info) => set((state) => ({ ...state, ...info })),
  clearUser: () => set(initialState),

  fetchMainProfile: async () => {
    set({ isLoading: true });
    try {
      const data = await getUserMainProfile();
      let serverImage = defaultProfileIcon;
      if (data.profileImageUrl) {
        if (data.profileImageUrl.startsWith('http')) {
          serverImage = data.profileImageUrl;
        } else {
          serverImage = `${BASE_URL}${data.profileImageUrl}`;
        }
      }
  
      set((state) => ({
        ...state,
        memberId: data.memberId,
        nickname: data.nickname,
        personaType: data.personaType ?? state.personaType,
        mindScore: data.finMindIdx ?? 0,
        fragmentCount: data.mindPieceCount ?? 0,  
        profileImage: serverImage,
        isLoading: false,
      }));
    } catch (error) {
      console.error("메인 프로필 로딩 실패:", error);
      set({ isLoading: false });
    }
  },

  fetchDetailProfile: async () => {
    set({ isLoading: true });
    try {
      const data = await getMyProfile();
      let serverImage = defaultProfileIcon;
      if (data.profileImageUrl) {
        if (data.profileImageUrl.startsWith('http')) {
          serverImage = data.profileImageUrl;
        } else {
          serverImage = `${BASE_URL}${data.profileImageUrl}`;
        }
      }

      set((state) => ({
        ...state,
        memberId: data.memberId,
        nickname: data.nickname,
        email: data.email,      
        profileImage: serverImage,
        personaType: data.personaType ?? state.personaType,
        isLoading: false,
      }));
    } catch (error) {
      console.error("상세 프로필 로딩 실패:", error);
      set({ isLoading: false });
    }
  },
}));