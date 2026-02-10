import { useQuery } from '@tanstack/react-query';
import { recordApi } from '@/apis/recordApi';
import type { RecordSearchRequest } from '@/types/record';

export const useRecordSearch = (params: RecordSearchRequest) => {
  return useQuery({
    queryKey: ['recordSearch', params],
    queryFn: () => recordApi.searchRecords(params),
    enabled: !!params.keyword,
  });
};
