import { useQuery } from '@tanstack/react-query';
import { recordApi } from '@/apis/recordApi';
import type { FragmentListResponse, FragmentListRequest } from '@/types/record';

export const useFragmentList = (params?: FragmentListRequest) => {
  return useQuery<FragmentListResponse>({
    queryKey: ['fragmentList', params],
    queryFn: () => recordApi.getFragmentList(params),
    enabled: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
