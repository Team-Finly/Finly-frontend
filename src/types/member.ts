import type { PersonaKey } from "@/constants/mypersona";

//내 정보 조회
export interface PersonaInfo {
  personaId: number;
  title: string;
  iconUrl: string
}

export interface MyPageMainData {
  profileImageUrl: string;
  memberId: number;
  nickname:string;
  personaType: PersonaKey | null;
  finMindIdx: number;
  mindPieceCount: number;
  profileImage: string | null;
}
//프로필 조회
export interface ProfileDetailData {
    profileImageUrl: string;
    personaType: PersonaKey | null;
    memberId: number;
    email: string;
    nickname: string;
    persona: PersonaInfo;
    profileImage: string | null;
}
//페르소나 결과조회
export interface PersonaDetail{
    personaType: PersonaKey | null;
    id: number;
    title: string;
    description: string;
    iconUrl: string;
}
export interface PersonaResultData {
    persona: PersonaDetail;
    createdAt: string;
    updatedAt: string;
    
}
//닉네임 변경
export interface UpdateNicknameRequest {
    nickname: string;
}
export interface UpdateNicknameResponse {
    nickname: string;
}
