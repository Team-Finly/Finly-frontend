import type { ApiResponse } from "@/types/types";
import { api } from "./client";
import type { RecordDetailResponse } from "@/types/record";

export const recordApi = {
  getTodayRecords: (date: string) =>
    api.get<ApiResponse<RecordDetailResponse>>('/api/records/today', {
      params: { date },
    }),
};