import type { WeeklyMoodResponse } from "@/types/emotion";
import { api } from "./client";
import type { HomeRecordResponse } from "@/types/record";
import type { ApiResponse } from "@/types/types";
import type { MindScoreDetailResponse, MindScoreResponse } from "@/types/mindScore";

export const homeApi = {
  getHomeRecords: async (): Promise<ApiResponse<HomeRecordResponse>> => {
    const res = await api.get('/api/home/records');
    return res.data;
  },

  getWeeklyMood: async (): Promise<ApiResponse<WeeklyMoodResponse>> => {
    const res = await api.get('/api/home/weekly');
    return res.data;
  },

  getMindScore: async (): Promise<ApiResponse<MindScoreResponse>> => {
    const res = await api.get('/api/home/mind');
    return res.data;
  },

  getMindScoreDetail: async (): Promise<ApiResponse<MindScoreDetailResponse>> => {
    const res = await api.get('/api/home/mind/detail');
    return res.data;
  }
};