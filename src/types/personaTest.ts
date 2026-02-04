import { api } from "@/apis/client";
import type { ApiResponse } from "./types";

export type PersonaQuestionOption = {
  id: number;
  choiceCode: string;
  content: string;
};

export type PersonaQuestion = {
  id: number;
  questionCode: string;
  content: string;
  options: PersonaQuestionOption[];
};

export type GetQuestionsResult = {
  questions: PersonaQuestion[];
};

export async function getPersonaQuestions() {
  const res = await api.get<ApiResponse<GetQuestionsResult>>("/api/persona-test/questions");
  return res.data;
}

export type SubmitAnswersRequest = {
  answers: { questionId: number; optionId: number }[];
};

export type SubmitAnswersResult = {
  persona: {
    id: number;
    title: string;
    description: string;
    iconUrl: string;
  };
  saved: boolean;
  createdAt: string;
  updatedAt: string;
};

export async function submitPersonaAnswers(mode: string, payload: SubmitAnswersRequest) {
  const res = await api.post<ApiResponse<SubmitAnswersResult>>(
    "/api/persona-test/submit",
    payload,
    { params: { mode } } // ✅ query param
  );
  return res.data;
}
