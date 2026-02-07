import { useQuery } from '@tanstack/react-query';
import { statsApi } from '@/apis/statsApi';

export const useEmotionDistribution = (symbol?: string) => {
  return useQuery({
    queryKey: ['emotionDistribution', symbol],
    queryFn: () => statsApi.getEmotionDistribution(symbol!),
    enabled: !!symbol,
  });
};

export const useShakenKeywords = (symbol?: string) => {
  return useQuery({
    queryKey: ['shakenKeywords', symbol],
    queryFn: () => statsApi.getShakenKeywords(symbol!),
    enabled: !!symbol,
  });
};

export const useGoldenTime = (symbol?: string) => {
  return useQuery({
    queryKey: ['goldenTime', symbol],
    queryFn: () => statsApi.getGoldenTime(symbol!),
    enabled: !!symbol,
  });
};
