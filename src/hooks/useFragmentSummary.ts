import { useQuery } from '@tanstack/react-query';
import { recordApi } from '@/apis/recordApi';

export const useFragmentSummary = () => {
  return useQuery({
    queryKey: ['fragmentSummary'],
    queryFn: () => recordApi.getFragmentSummary(),
    staleTime: 60 * 1000,
  });
};
