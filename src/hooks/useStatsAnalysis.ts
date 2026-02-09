import { useQuery } from '@tanstack/react-query';
import { statsApi } from '@/apis/statsApi';

export const useDailyChart = (symbol?: string) => {
  return useQuery({
    queryKey: ['dailyChart', symbol],
    queryFn: () => statsApi.getDailyChart(symbol!),
    enabled: !!symbol,
  });
};

export const useFearIndex = () => {
  return useQuery({
    queryKey: ['fearIndex'],
    queryFn: () => statsApi.getFearIndex(),
  });
};

export const useConvictionScore = () => {
  return useQuery({
    queryKey: ['convictionScore'],
    queryFn: () => statsApi.getConvictionScore(),
  });
};

export const useAiAnalysis = () => {
  return useQuery({
    queryKey: ['aiAnalysis'],
    queryFn: () => statsApi.getAiAnalysis(),
  });
};

export const useHourlyChart = (symbol?: string, targetDate?: string) => {
  return useQuery({
    queryKey: ['hourlyChart', symbol, targetDate],
    queryFn: () => statsApi.getHourlyChart(symbol!, targetDate),
    enabled: !!symbol,
  });
};
