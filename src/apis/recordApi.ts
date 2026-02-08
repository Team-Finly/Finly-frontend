import type { ApiResponse } from '@/types/types';
import { api } from '@/apis/client';
import type {
  SearchStock,
  CreateRecordRequest,
  CreateRecordResponse,
  FeedbackResponse,
  RecordDetailResponse,
  RecordDailyDetailResponse,
  UpdateRecordRequest,
  FragmentSummaryResponse,
  FragmentListRequest,
  FragmentListResponse,
  RecordUpdateResponse,
} from '@/types/record';

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

  createRecord: async (
    record: CreateRecordRequest,
  ): Promise<CreateRecordResponse> => {
    const res = await api.post<ApiResponse<CreateRecordResponse>>(
      '/api/records',
      record,
    );
    return res.data.result;
  },

  updateRecord: async (
    recordId: number,
    record: UpdateRecordRequest,
  ): Promise<RecordUpdateResponse> => {
    const res = await api.patch<ApiResponse<RecordUpdateResponse>>(
      `/api/records/${recordId}`,
      record,
    );
    return res.data.result;
  },

  getFeedback: async (recordId: number): Promise<FeedbackResponse> => {
    const res = await api.get<ApiResponse<FeedbackResponse>>(
      `/api/records/${recordId}/feedback`,
    );
    return res.data.result;
  },

  regenerateFeedback: async (recordId: number): Promise<FeedbackResponse> => {
    const res = await api.post<ApiResponse<FeedbackResponse>>(
      `/api/records/${recordId}/feedback/regenerate`,
    );
    return res.data.result;
  },

  getRecordDetail: async (recordId: number) => {
    const res = await api.get<ApiResponse<RecordDetailResponse>>(
      `/api/records/${recordId}`,
    );
    return res.data.result;
  },

  getTodayRecords: (date: string) =>
    api.get<ApiResponse<RecordDailyDetailResponse>>('/api/records/today', {
      params: { date },
    }),

  getFragmentSummary: async (): Promise<FragmentSummaryResponse> => {
    const res = await api.get<ApiResponse<FragmentSummaryResponse>>(
      '/api/records/fragments/summary',
    );
    return res.data.result;
  },

  getFragmentList: async (params?: FragmentListRequest) => {
    const res = await api.get<ApiResponse<FragmentListResponse>>(
      '/api/records/fragments',
      { params },
    );
    return res.data.result;
  },
};
