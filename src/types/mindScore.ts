export interface MindScoreResult {
  userName: string;
  personaTitle: string;
  fmiScore: number;
  fmiLevelLabel: string;
  fmiDescription: string;
};

export interface MindScoreResponse {
  result: MindScoreResult;
}

export interface MindScoreDetail {
  score: number;
  description: string;
}

export interface PersonaScoreMap {
  downMarketResilience: MindScoreDetail;
  decisionConsistency: MindScoreDetail;
  recordConsistency: MindScoreDetail;
}

export interface MindScoreDetailResult {
  memberName: string;
  personaTitle: string;
  personaDescription: string;
  fmiScore: number;
  fmiLevel: string;
  fmiComment: string;
  scores: PersonaScoreMap;
}

export interface MindScoreDetailResponse {
  result: MindScoreDetailResult;
}



