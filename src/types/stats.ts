export interface Stock {
  id: number;
  name: string;
  logoUrl: string;
}

export const STATS_TABS = [
  { id: 'RELATION', label: '연관 분석' },
  { id: 'STOCK', label: '주식 데이터' },
  { id: 'EMOTION', label: '감정 통계' },
] as const;

export type TabType = (typeof STATS_TABS)[number]['id'];
