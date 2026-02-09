export type EmotionType =
  | 'CONFIDENCE'
  | 'CALM'
  | 'ANXIETY'
  | 'GREED'
  | 'REGRET';

export type PeriodType = 'ALL' | 'MONTH_1' | 'MONTH_3' | 'MONTH_6' | 'YEAR_1';

export type SessionType =
  | 'PRE_MARKET'
  | 'MORNING'
  | 'AFTERNOON'
  | 'POST_MARKET';

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

// 감정 조각 스펙트럼
export interface TypeSummary {
  type: EmotionType;
  count: number;
  percent: number;
}

export interface FragmentSummaryResponse {
  totalCount: number;
  dominantType: EmotionType;
  typeSummary: TypeSummary[];
}

// 조각 모음함 리스트
export interface FragmentItem {
  recordDate: string;
  fragmentId: number;
  stock: {
    stockId: number;
    stockName: string;
    tradeAction: TradeActionType;
  };
  unitPrice: number;
  quantity: number;
  memo: string;
  emotionCode: EmotionType;
  emotionName: string;
}

export interface FragmentListRequest {
  boxType?: EmotionType;
  periodKey?: PeriodType;
}

export interface FragmentListResponse {
  box: {
    boxType: EmotionType;
    boxTypeName: string;
  };
  period: {
    periodKey: PeriodType;
    from: string;
    to: string;
  };
  summary: {
    totalCount: number;
    boxTypeName: string;
  };
  fragments: FragmentItem[];
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

// 주식 종목 검색
export interface Stock {
  id: number;
  symbol: string;
  name: string;
  marketType: 'KOSPI' | 'KOSDAQ';
  logoUrl: string;
}

export interface PageInfo {
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface SearchStock {
  searchKeyword: string;
  totalCount: number;
  stocks: Stock[];
  pageInfo: PageInfo;
}

// 기록 생성
export interface CreateRecordRequest {
  clientRequestId: string;
  recordDate: string;
  symbol: string;
  tradeAction: TradeActionType;
  unitPrice: number;
  quantity: number;
  emotionCode: EmotionType;
  emotionIntensity: number;
  memo: string;
}

export interface CreateRecordResponse extends CreateRecordRequest {
  feedback: {
    feedbackId: number;
    status: 'PENDING' | 'COMPLETED';
  };
  recordId: number;
  recordedAt: string;
  session: SessionType;
}

export type UpdateRecordRequest = Omit<CreateRecordRequest, 'clientRequestId'>;

// AI 피드백
export interface FeedbackResponse {
  feedbackId: number;
  recordEntryId: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  content: string;
  suggestion: string;
  createdAt: string;
  updatedAt: string;
}

// 기록 상세 조회
export interface RecordDetailResponse {
  emotionCode: EmotionType;
  emotionIntensity: number;
  memo: string;
  quantity: number;
  recordDate: string;
  recordId: number;
  recordedAt: string;
  session: SessionType;
  symbol: string;
  tradeAction: TradeActionType;
  unitPrice: number;
}

// 기록 수정
export interface RecordUpdateResponse {
  emotionCode: EmotionType;
  emotionIntensity: number;
  memo: string;
  quantity: number;
  recordDate: string;
  recordId: number;
  session: SessionType;
  symbol: string;
  tradeAction: TradeActionType;
  unitPrice: number;
  updatedAt: string;
}

// 해당 일 기록
export interface PrismFeedback {
  title: string;
  generatedAt: string;
}

export interface TimelineSummaryItem {
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

export interface RecordDailyDetailResponse {
  date: string;
  prismFeedback: PrismFeedback;
  timelineSummary: TimelineSummaryItem[];
  hasRecords: boolean;
  recordCount: number;
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

// 기록 검색
export interface RecordSearchRequest {
  keyword: string;
  emotionCode?: EmotionType;
}

export interface RecordSearchResponse {
  records: RecordDetailResponse[];
  totalCount: number;
}
