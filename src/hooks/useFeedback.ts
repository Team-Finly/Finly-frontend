import { useQuery } from '@tanstack/react-query';
import { recordApi } from '@/apis/recordApi';
import type { FeedbackResponse } from '@/types/record';

export const useFeedback = (recordId?: number) => {
  return useQuery<FeedbackResponse>({
    queryKey: ['feedback', recordId],
    queryFn: () => recordApi.getFeedback(recordId!),
    enabled: !!recordId,
    refetchInterval: (query) =>
      query.state.data?.status === 'COMPLETED' ? false : 1000,
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
  });
};
