export interface Persona {
  personaTitle: string;
  personaType: string;
}

export interface MindScoreResponse {
  memberName: string;
  persona: Persona;
  fmiScore: number;
  fmiLevel: string;
  fmiComment: string;
};

export interface MindScoreDetail {
  score: number;
  description: string;
}

export interface PersonaScoreMap {
  downMarketResilience: MindScoreDetail;
  decisionConsistency: MindScoreDetail;
  recordConsistency: MindScoreDetail;
}

export interface MindScoreDetailResponse {
  memberName: string;
  personaTitle: string;
  personaDescription: string;
  fmiScore: number;
  fmiLevel: string;
  fmiComment: string;
  scores: PersonaScoreMap;
}


