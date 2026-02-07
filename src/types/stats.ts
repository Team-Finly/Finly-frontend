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
