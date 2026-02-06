import { useMutation, useQueryClient } from '@tanstack/react-query';
import { recordApi } from '@/apis/recordApi';
import { useNavigate } from 'react-router-dom';
import type { CreateRecordRequest } from '@/types/record';

export const useCreateRecord = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRecordRequest) => recordApi.createRecord(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['records'] });
      navigate('/loading', { state: { recordId: data.recordId } });
    },
    onError: (error) => {
      console.log('기록 작성 실패', error);
    },
  });
};
