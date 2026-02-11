import { useQuery } from '@tanstack/react-query';
import { recordApi } from '@/apis/recordApi';

export const useCalendarFragment = (yearMonth: string) => {
  return useQuery({
    queryKey: ['calendar', yearMonth],
    queryFn: () => recordApi.getCalendarFragment(yearMonth),
  });
};
