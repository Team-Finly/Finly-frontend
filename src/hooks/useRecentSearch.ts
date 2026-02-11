import { useQuery } from '@tanstack/react-query';
import { recordApi } from '@/apis/recordApi';

export const useRecentSearch = () => {
  return useQuery({
    queryKey: ['recentKeywords'],
    queryFn: recordApi.getRecentSearch,
    staleTime: 0,
  });
};
