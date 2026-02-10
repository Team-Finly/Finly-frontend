import { useQuery } from '@tanstack/react-query';
import { recordApi } from '@/apis/recordApi';

export const useTodayRecords = (date: string) => {
  return useQuery({
    queryKey: ['todayRecords', date],
    queryFn: () =>
      recordApi.getTodayRecords(date).then(res => res.data.result),
    enabled: !!date,
  });
};
