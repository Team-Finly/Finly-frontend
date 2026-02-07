import { useMutation } from '@tanstack/react-query';
import { recordApi } from '@/apis/recordApi';
import type { UpdateRecordRequest } from '@/types/record';

export const useUpdateRecord = (recordId: number) => {
  return useMutation({
    mutationFn: (payload: UpdateRecordRequest) =>
      recordApi.updateRecord(recordId, payload),
  });
};