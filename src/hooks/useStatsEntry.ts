import { useQuery } from '@tanstack/react-query';
import { statsApi } from '@/apis/statsApi';

export const useStatsEntry = () => {
  return useQuery({
    queryKey: ['statsEntry'],
    queryFn: statsApi.getStatsEntry,
    staleTime: 60 * 1000,
  });
};

export const useRecordedStocks = () => {
  return useQuery({
    queryKey: ['recordedStocks'],
    queryFn: statsApi.getRecordedStocks,
  });
};
