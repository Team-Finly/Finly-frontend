import { useQuery } from '@tanstack/react-query';
import { homeApi } from '@/apis/homeApi';

export const useMindScoreDetail = () => {
  return useQuery({
    queryKey: ['mindScoreDetail'],
    queryFn: homeApi.getMindScoreDetail,
    staleTime: 1000 * 60 * 5,
  });
};
