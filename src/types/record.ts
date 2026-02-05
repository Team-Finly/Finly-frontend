export type EmotionType =
  | 'CONFIDENCE'
  | 'CALM'
  | 'ANXIETY'
  | 'GREED'
  | 'REGRET';

export type SessionType = 'PRE_MARKET' | 'MORNING' | 'AFTERNOON' | 'POST_MARKET';

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

// 주식 종목
export interface Stock {
  id: number;
  symbol: string;
  name: string;
  marketType: 'KOSPI' | 'KOSDAQ';
  logoUrl: string;
}

// 해당 일 기록 
export interface TradeItem {
  recordId: number;
  instrumentId: number;
  instrumentName: string;
  emotionCode: string;     
  emotionDisplay: string;  
  tradeAction: 'BUY' | 'SELL';
  unitPrice: number;
  quantity: number;
  memoPreview: string;
  recordedAt: string;     
}

export interface TimelineSection {
  session: SessionType;
  items: TradeItem[];
}

export interface RecordDetailResponse {
  date: string;           
  sections: TimelineSection[];
}

// 최근 나의 기록 (home)
export interface HomeRecordItem {
  recordId: number;
  recordDate: string;       
  recordedAt: string;      
  session: SessionType;
  tradeAction: TradeActionType;
  symbol: string;
  unitPrice: number;
  quantity: number;
  emotionCode: EmotionType;
  emotionIntensity: number;
  memo: string;
}

export interface HomeRecordResponse {
  records: HomeRecordItem[];
}