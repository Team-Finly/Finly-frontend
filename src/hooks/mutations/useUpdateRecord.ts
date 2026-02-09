import { useMutation, useQueryClient } from '@tanstack/react-query';
import { recordApi } from '@/apis/recordApi';
import { useNavigate } from 'react-router-dom';
import type { UpdateRecordRequest } from '@/types/record';
import { useRecordCreateStore } from '@/store/recordCreateStore';

export const useUpdateRecord = (recordId: number) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateRecordRequest) => {
      const updateResult = await recordApi.updateRecord(recordId, payload);
      try {
        await recordApi.regenerateFeedback(recordId);
      } catch (error) {
        console.log('피드백 재생성 실패', error);
      }
      return updateResult;
    },
    onSuccess: () => {
      const { reset } = useRecordCreateStore.getState();
      reset();

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
