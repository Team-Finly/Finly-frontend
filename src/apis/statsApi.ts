import { api } from '@/apis/client';
import type {
  DecisionItem,
  GoldenTimeResult,
  StatsEntryResponse,
  StatsEntryResult,
  StockDistributionResponse,
  StockDistributionResult,
  StockEmotionDistribution,
  StockKeywordsResult,
  StockSummaryResponse,
  StockSummaryResult,
} from '@/types/stats';
import type { ApiResponse } from '@/types/types';

export const statsApi = {
  /** 통계 진입(종목 기록 정도) */
  getStatsEntry: async (): Promise<StatsEntryResult> => {
    const res = await api.get<StatsEntryResponse>('/api/analysis/entry');
    return res.data.result;
  },

  /** 기록 종목 조회 */
  getRecordedStocks: async () => {
    const res = await api.get<
      ApiResponse<Array<{ stockId: number; symbol: string; stockName: string }>>
    >('api/analysis/record/stocks');
    return res.data.result;
  },

  /** 주식 데이터 탭 요약 */
  getStockSummary: async (symbol: string): Promise<StockSummaryResult> => {
    const res = await api.get<StockSummaryResponse>(
      `/api/analysis/stocks/${symbol}/summary`,
    );
    return res.data.result;
  },

  /** 주식 데이터 탭 가격대 분포 */
  getPriceDistribution: async (
    symbol: string,
  ): Promise<StockDistributionResult> => {
    const res = await api.get<StockDistributionResponse>(
      `api/analysis/stocks/${symbol}/price-distribution`,
    );
    return res.data.result;
  },

  /** 주식 데이터 탭 최근 판단 기록 */
  getRecentDecisions: async (symbol: string): Promise<DecisionItem[]> => {
    const res = await api.get<ApiResponse<DecisionItem[]>>(
      `/api/analysis/stocks/${symbol}/recent?limit=3`,
    );
    return res.data.result;
  },

  /** 감정 통계 탭 감정 그래프 */
  getEmotionDistribution: async (
    symbol: string,
  ): Promise<StockEmotionDistribution> => {
    const res = await api.get<ApiResponse<StockEmotionDistribution>>(
      `/api/analysis/stocks/${symbol}/emotion-distribution`,
    );
    return res.data.result;
  },

  /** 감정 통계 탭 키워드 */
  getShakenKeywords: async (symbol: string): Promise<StockKeywordsResult> => {
    const res = await api.get<ApiResponse<StockKeywordsResult>>(
      `/api/analysis/stocks/${symbol}/shaken-keywords`,
    );
    return res.data.result;
  },

  /** 감정 통계 탭 골든 타임 */
  getGoldenTime: async (symbol: string): Promise<GoldenTimeResult> => {
    const res = await api.get<ApiResponse<GoldenTimeResult>>(
      `/api/analysis/stocks/${symbol}/emotion-golden-time`,
    );
    return res.data.result;
  },
};
