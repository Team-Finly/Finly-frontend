import { api } from "./client";
import type { HomeRecordResponse } from "@/types/record";
import type { ApiResponse } from "@/types/types";

export const homeRecordApi = {
  getHomeRecords: async (): Promise<ApiResponse<HomeRecordResponse>> => {
    const res = await api.get('/api/home/records');
    return res.data;
  },
};