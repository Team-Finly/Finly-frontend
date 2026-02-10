import { useQuery } from '@tanstack/react-query';
import { homeApi } from '@/apis/homeApi';

export const useMindScore = () => {
  return useQuery({
    queryKey: ['mindScore'],
    queryFn: homeApi.getMindScore,
    staleTime: 1000 * 60 * 5,
    select: (res) => res.result,
  });
};
