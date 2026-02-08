import { create } from 'zustand';
import { getUserMainProfile, getMyProfile } from '@/apis/userApi'; 
import defaultProfileIcon from "@/assets/icons/profile.svg";
import type { PersonaKey } from "@/constants/mypersona";
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
      set((state) => ({
        ...state,
        memberId: data.memberId,
        nickname: data.nickname,
        personaType: data.personaType ?? state.personaType,
        mindScore: data.finMindIdx,    
        fragmentCount: data.mindPieceCount ?? 0,  
        isLoading: false,
      }));
    } catch (error) {
      console.error("메인 프로필 로딩 실패:", error);
      set({ isLoading: false });
    }
  },

  fetchDetailProfile: async () => {
    try {
      const data = await getMyProfile();
      set((state) => ({
        ...state,
        memberId: data.memberId,
        nickname: data.nickname,
        email: data.email,      
        profileImage: data.profileImage ?? defaultProfileIcon, 
        personaType: data.personaType ?? state.personaType,
      }));
    } catch (error) {
      console.error("상세 프로필 로딩 실패:", error);
    }
  },
}));