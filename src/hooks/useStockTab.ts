import { useQuery } from '@tanstack/react-query';
import { statsApi } from '@/apis/statsApi';

export const useStockSummary = (symbol?: string) => {
  return useQuery({
    queryKey: ['stockSummary', symbol],
    queryFn: () => statsApi.getStockSummary(symbol!),
    enabled: !!symbol,
    staleTime: 30 * 1000,
  });
};

export const usePriceDistribution = (symbol?: string) => {
  return useQuery({
    queryKey: ['priceDistribution', symbol],
    queryFn: () => statsApi.getPriceDistribution(symbol!),
    enabled: !!symbol,
  });
};

export const useRecentDecisions = (symbol?: string) => {
  return useQuery({
    queryKey: ['recentDecisions', symbol],
    queryFn: () => statsApi.getRecentDecisions(symbol!),
    enabled: !!symbol,
  });
};
