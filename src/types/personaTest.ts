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

export type SubmitAnswersRequest = {
  answers: { questionId: number; optionId: number }[];
};

export interface PersonaData {
  id: number;
  title: string;
  description: string;
  iconUrl: string;
}
export interface SubmitAnswersResult {
  personaType: string;
  saved: boolean;
  createdAt: string;
  updatedAt: string;
}