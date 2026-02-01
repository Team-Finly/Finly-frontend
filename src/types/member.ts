//내 정보 조회
export interface PersonaInfo {
  personaId: number;
  title: string;
  iconUrl: string
}

export interface MyPageMainData {
  memberId: number;
  email: string
  nickname:string;
  persona: PersonaInfo;
  findMindIdx: number;
  mindPieceCount: number;
}
//프로필 조회
export interface ProfileDetailData {
    memberId: number;
    email: string;
    nickname: string;
    persona: PersonaInfo;
}
//페르소나 결과조회
export interface PersonaDetail{
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