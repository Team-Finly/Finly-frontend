import { useQuery } from '@tanstack/react-query';
import { recordApi } from '@/apis/recordApi';
import type { FeedbackResponse } from '@/types/record';

export const useFeedback = (
  recordId?: number,
  options?: {
    enabled?: boolean;
  }
) => {
  return useQuery<FeedbackResponse>({
    queryKey: ['feedback', recordId],
    queryFn: () => recordApi.getFeedback(recordId!),
    enabled: options?.enabled ?? !!recordId,
    retry: false,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status === 'COMPLETED' || status === 'FAILED' ? false : 1000;
    },
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
  });
};
