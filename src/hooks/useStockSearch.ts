import { useInfiniteQuery } from '@tanstack/react-query';
import { recordApi } from '@/apis/recordApi';

export const useStockSearch = (keyword: string) => {
  return useInfiniteQuery({
    queryKey: ['stocks', 'search', keyword],
    queryFn: ({ pageParam = 0 }) =>
      recordApi.searchStocks(keyword, pageParam, 20),
    enabled: !!keyword.trim(),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { pageInfo } = lastPage;
      return !pageInfo.last ? pageInfo.currentPage + 1 : null;
    },
    staleTime: 30 * 1000,
  });
};
