import { create } from "zustand";

type TermAgreement = { termId: number; agreed: boolean };
type PersonaAnswer = { questionId: number; optionId: number };

type SignupState = {
  email: string;
  password: string;
  nickname: string;

  termAgreements: TermAgreement[];
  personaAnswers: PersonaAnswer[];

  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  setNickname: (v: string) => void;

  setTermAgreements: (v: TermAgreement[]) => void;
  setPersonaAnswers: (v: PersonaAnswer[]) => void;

  reset: () => void;
};

export const useSignupStore = create<SignupState>((set) => ({
  email: "",
  password: "",
  nickname: "",
  termAgreements: [],
  personaAnswers: [],

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setNickname: (nickname) => set({ nickname }),

  setTermAgreements: (termAgreements) => set({ termAgreements }),
  setPersonaAnswers: (personaAnswers) => set({ personaAnswers }),

  reset: () =>
    set({
      email: "",
      password: "",
      nickname: "",
      termAgreements: [],
      personaAnswers: [],
    }),
}));
