import { useMutation, useQueryClient } from '@tanstack/react-query';
import { recordApi } from '@/apis/recordApi';

export const useDeleteRecentSearch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (keyword: string) => recordApi.deleteRecentKeyword(keyword),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recentKeywords'] });
    },
    onError: (error) => {
      console.error('검색 기록 삭제 실패:', error);
    },
  });
};
