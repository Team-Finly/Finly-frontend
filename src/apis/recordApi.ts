import type { ApiResponse } from '@/types/types';
import { api } from '@/apis/client';
import type { SearchStock } from '@/types/record';

export const recordApi = {
  searchStocks: async (
    keyword: string,
    page = 0,
    size = 20,
  ): Promise<SearchStock> => {
    const res = await api.get<ApiResponse<SearchStock>>('/api/stocks/search', {
      params: {
        keyword,
        page,
        size,
        sort: 'name,asc',
      },
    });
    return res.data.result;
  },
};
