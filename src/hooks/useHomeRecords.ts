import { homeRecordApi } from '@/apis/homeApi';
import type { HomeRecordItem } from '@/types/record';
import { useQuery } from '@tanstack/react-query';

export const HOME_RECORDS_QUERY_KEY = ['home', 'records'];

export const useHomeRecords = () => {
  return useQuery<HomeRecordItem[]>({
    queryKey: HOME_RECORDS_QUERY_KEY,
    queryFn: async () => {
      const res = await homeRecordApi.getHomeRecords();
      return res.result?.records ?? [];
    },
  
    staleTime: 60 * 1000,   
    gcTime: 5 * 60 * 1000,  
  });
};
