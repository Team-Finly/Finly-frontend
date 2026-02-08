import { useMutation, useQueryClient } from '@tanstack/react-query';
import { recordApi } from '@/apis/recordApi';
import { useNavigate } from 'react-router-dom';
import type { UpdateRecordRequest } from '@/types/record';

export const useUpdateRecord = (recordId: number) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateRecordRequest) => {
      await recordApi.updateRecord(recordId, payload);
      return await recordApi.regenerateFeedback(recordId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['home'] });
      queryClient.invalidateQueries({ queryKey: ['recordDetail'] });
      queryClient.invalidateQueries({ queryKey: ['todayRecords'] });
      queryClient.invalidateQueries({ queryKey: ['fragmentList'] });
      queryClient.invalidateQueries({ queryKey: ['fragmentSummary'] });
      queryClient.invalidateQueries({ queryKey: ['feedback'] });
      navigate('/loading', { state: { recordId }, replace: true });
    },
    onError: (error) => {
      console.error('기록 수정 실패', error);
    },
  });
};
