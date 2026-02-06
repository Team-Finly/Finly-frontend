import { useQuery } from '@tanstack/react-query';
import { recordApi } from '@/apis/recordApi';

export const useRecordDetail = (recordId?: number) => {
  return useQuery({
    queryKey: ['recordDetail', recordId],
    queryFn: () => recordApi.getRecordDetail(recordId!),
    enabled: !!recordId,
    staleTime: 5 * 60 * 1000,
  });
};
