import type { MindScoreDetailResponse } from '@/types/mindScore';

export type Metric = {
  key: string;
  title: string;
  score: number;
  desc: string;
};

const TITLE_MAP = {
  downMarketResilience: '하락장 회복 탄력성',
  decisionConsistency: '의사결정 일치도',
  recordConsistency: '기록의 성실도',
} as const;

export const convertScoresToMetrics = (
  scores: MindScoreDetailResponse['scores']
): Metric[] => {
  return Object.entries(scores).map(([key, value]) => ({
    key,
    title: TITLE_MAP[key as keyof typeof TITLE_MAP],
    score: value.score,
    desc: value.description,
  }));
};