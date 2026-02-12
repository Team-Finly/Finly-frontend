import type { ApiResponse } from '@/types/types';

export const STATS_TABS = [
  { id: 'RELATION', label: '연관 분석' },
  { id: 'STOCK', label: '주식 데이터' },
  { id: 'EMOTION', label: '감정 통계' },
] as const;

export type TabType = (typeof STATS_TABS)[number]['id'];

export type RecordLevel = 'NONE' | 'LOW' | 'HIGH';

export interface StatsEntryResult {
  recordLevel: RecordLevel;
  totalRecordCount: number;
  defaultStock: {
    stockId: number;
    symbol: string;
    name: string;
  } | null;
}

export type StatsEntryResponse = ApiResponse<StatsEntryResult>;

export interface StockSummaryResult {
  averageBuyPrice: number;
  currentPrice: number;
  totalBuyCount: number;
  maxHoldingDays: number;
}

export type StockSummaryResponse = ApiResponse<StockSummaryResult>;

export interface DistributionItem {
  rangeType: 'LOW' | 'MID' | 'HIGH';
  displayRange: string;
  count: number;
  ratio: number;
  isFocused: boolean;
}

export interface StockDistributionResult {
  averageBuyPrice: number;
  rangePolicy: {
    type: string;
    percent: number;
  };
  distributions: DistributionItem[];
}

export type StockDistributionResponse = ApiResponse<StockDistributionResult>;

export interface DecisionItem {
  stockName: string;
  emotion: string;
  tradeType: string;
  price: number;
  date: string;
  quantity: number;
  decisionResult: number;
}

export interface TypeSummaryItem {
  type: string;
  count: number;
  percent: number;
}

export interface StockEmotionDistribution {
  totalCount: number;
  stock: {
    symbol: string;
    stockName: string;
  };
  typeSummary: TypeSummaryItem[];
}

export interface KeywordItem {
  rank: number;
  keyword: string;
  count: number;
}

export interface StockKeywordsResult {
  stock: {
    symbol: string;
    stockName: string;
  };
  keywords: KeywordItem[];
}

export interface SessionItem {
  session: 'PRE_MARKET' | 'MORNING' | 'AFTERNOON' | 'POST_MARKET';
  sessionName: string;
  recordCount: number;
  percent: number;
}

export interface GoldenTimeResult {
  nickname: string;
  stock: {
    symbol: string;
    name: string;
  };
  summary: {
    totalRecords: number;
    goldenTime: string;
    goldenTimeName: string;
  };
  session: SessionItem[];
}

export interface DailyData {
  closePrice: number;
  date: string;
  day: string;
  emotions: string[];
  mainEmotion: string;
  recordCount: number;
}

export interface DailyChartResult {
  dailyData: DailyData[];
  endDate: string;
  startDate: string;
  stockId: number;
  stockName: string;
  symbol: string;
  today: string;
}

export type DailyChartResponse = ApiResponse<DailyChartResult>;

export interface FearIndexResult {
  fearIndex: number;
  changeDirection: 'UP' | 'DOWN' | 'SAME';
  changeValue: number;
  phrase: string;
}

export type FearIndexResponse = ApiResponse<FearIndexResult>;

export interface ConvictionScoreResult {
  convictionScore: number;
  phrase: string;
  status: 'LOW' | 'MID' | 'GOOD' | 'HIGH';
}

export type ConvictionScoreResponse = ApiResponse<ConvictionScoreResult>;

export interface AiAnalysisResult {
  text: string;
}

export type AiAnalysisResponse = ApiResponse<AiAnalysisResult>;

export interface AnalysisPricePoint {
  dateTime: string;
  price: number;
}

export interface AnalysisRecord {
  recordId: number;
  recordDateTime: string;
  emotionCode: string;
  emotionIntensity: number;
  tradeAction: 'BUY' | 'SELL' | 'WATCH';
  quantity: number | null;
  unitPrice: number | null;
  totalPrice: number | null;
  memo: string;
  finlyTalk: string;
}

export interface AnalysisDetailResult {
  stockId: number;
  stockCode: string;
  stockName: string;
  now: string;
  targetDate: string;
  prices: AnalysisPricePoint[];
  records: AnalysisRecord[];
}
