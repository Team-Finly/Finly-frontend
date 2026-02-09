import { api } from '@/apis/client';
import type {
  AiAnalysisResponse,
  AiAnalysisResult,
  AnalysisDetailResult,
  ConvictionScoreResponse,
  ConvictionScoreResult,
  DailyChartResponse,
  DailyChartResult,
  DecisionItem,
  FearIndexResponse,
  FearIndexResult,
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
    >('/api/analysis/record/stocks');
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
      `/api/analysis/stocks/${symbol}/price-distribution`,
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

  /** 주가 & 감정 그래프 */
  getDailyChart: async (symbol: string): Promise<DailyChartResult> => {
    const res = await api.get<DailyChartResponse>(
      `/api/analysis/stocks/${symbol}/charts/daily`,
    );
    return res.data.result;
  },

  /** 하락장 공포 지수 */
  getFearIndex: async (): Promise<FearIndexResult> => {
    const res = await api.get<FearIndexResponse>('/api/analysis/fear-index');
    return res.data.result;
  },

  /** 매수 확신도 */
  getConvictionScore: async (): Promise<ConvictionScoreResult> => {
    const res = await api.get<ConvictionScoreResponse>(
      '/api/analysis/conviction-score',
    );
    return res.data.result;
  },

  /** 투자 패턴 발견 */
  getAiAnalysis: async (): Promise<AiAnalysisResult> => {
    const res = await api.get<AiAnalysisResponse>('/api/analysis/ai');
    return res.data.result;
  },

  /** 심층 분석 그래프 */
  getHourlyChart: async (
    symbol: string,
    targetDate?: string,
  ): Promise<AnalysisDetailResult> => {
    const res = await api.get<ApiResponse<AnalysisDetailResult>>(
      `/api/analysis/stocks/${symbol}/charts/hourly`,
      { params: { targetDate } },
    );
    return res.data.result;
  },
};
