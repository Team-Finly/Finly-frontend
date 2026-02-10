export type SubmitAnswersRequest = { 
  answers: { questionId: number; optionId: number }[];
};

export interface Option {
  id: number;
  choiceCode: string;
  content: string;
}

export interface Question {
  id: number;
  questionCode: string;
  content: string;
  options: Option[];
}
