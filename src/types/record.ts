export type EmotionType =
  | 'CONFIDENCE'
  | 'CALM'
  | 'ANXIETY'
  | 'GREED'
  | 'REGRET';

export type TradeActionType = 'BUY' | 'SELL' | 'WATCH';

// 캘린더 기록
export interface DailyRecord {
  date: string;
  hasRecord: boolean;
  emotions: string[];
}

export interface MonthlyRecordResponse {
  year: number;
  month: number;
  days: DailyRecord[];
}

// 조각 모음함
export interface EmotionSummary {
  emotion: EmotionType;
  count: number;
  ratio: number;
}

export interface FragmentSummary {
  totalFragmentCount: number;
  emotionSummary: EmotionSummary[];
  dominantEmotion: EmotionType;
}

// TODAY 마음 조각
export interface DailyFragment {
  recordId: number;
  instrumentName: string;
  tradeAction: string;
  unitPrice: number;
  emotion: EmotionType;
  emotionIntensity: number;
  recordedAt: string;
}

export interface DailyFragmentResponse {
  date: string;
  records: DailyFragment[];
}
