import { api } from "./client";
import type { StockInfo } from "@/types/stock";
import type { ApiResponse } from "@/types/types";

export const stockInfoApi = {
  getStocks: async (): Promise<ApiResponse<StockInfo[]>> => {
    const res = await api.get('/api/internal/stock-info/stocks');
    return res.data;
  },
};