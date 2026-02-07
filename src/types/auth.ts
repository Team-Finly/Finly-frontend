export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

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
export interface Term {
  termId: number;
  title: string;
  required: boolean;
  type?: string;
}

export interface TermDetail extends Term {
  termType: string;
  content: string;
}