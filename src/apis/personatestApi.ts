import { api } from "@/apis/client";
import type { ApiResponse } from "@/types/types";

import type { 
  GetQuestionsResult, 
  SubmitAnswersRequest, 
  SubmitAnswersResult 
} from "@/types/personaTest";

export async function getPersonaQuestions() {
  const res = await api.get<ApiResponse<GetQuestionsResult>>("/api/persona-test/questions");
  return res.data;
}

export async function submitPersonaAnswers(mode: string, payload: SubmitAnswersRequest) {
  const res = await api.post<ApiResponse<SubmitAnswersResult>>(
    "/api/persona-test/submit",
    payload,
    { params: { mode } } 
  );
  return res.data;
}