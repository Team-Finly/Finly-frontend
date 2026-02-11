import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

type TermAgreement = { termId: number; agreed: boolean };
type PersonaAnswer = { questionId: number; optionId: number };

type SignupState = {
  email: string;
  password: string;
  nickname: string;
  agreements: Record<string, boolean>;

  termAgreements: TermAgreement[];
  personaAnswers: PersonaAnswer[];

  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  setNickname: (v: string) => void;
  toggleAgreement: (id: string) => void;
  setAllAgreements: (checked: boolean, ids?: string[]) => void;
  setTermAgreements: (v: TermAgreement[]) => void;

  setPersonaAnswers: (v: PersonaAnswer[]) => void;

  reset: () => void;
};


export const useSignupStore = create<SignupState>()(
  persist(
    (set) => ({
      email: "",
      password: "",
      nickname: "",

  agreements: { "1": false, "2": false, "3": false },

  termAgreements: [],
  personaAnswers: [],

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setNickname: (nickname) => set({ nickname }),

  toggleAgreement: (id) => set((state) => ({
    agreements: {
      ...state.agreements,
      [id]: !state.agreements[id] 
    }
  })),
    setAllAgreements: (checked, ids) => set(() => {
      const newAgreements: Record<string, boolean> = { };
      ids?.forEach((id)=> {
        newAgreements[id] = checked;
      })
      return { agreements: newAgreements };
  }),
  setTermAgreements: (termAgreements) => set({ termAgreements }),
  setPersonaAnswers: (personaAnswers) => set({ personaAnswers }),

  reset: () =>
    set({
      email: "",
      password: "",
      nickname: "",
      agreements: { },
      termAgreements: [],
      personaAnswers: [],
    }),
}),
{
      name: 'signup-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
