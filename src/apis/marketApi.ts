import type { ApiResponse } from "@/types/types";
import { api } from "./client";
import type { MarketIndex, MarketInsight } from "@/types/market";

export const marketApi = {
  getMarketIndex: async (): Promise<MarketIndex> => {
    const res = await api.get<ApiResponse<MarketIndex>>(
      "/api/market/index"
    );
    return res.data.result;
  },

  getMarketInsight: async () => {
    const res = await api.get<ApiResponse<MarketInsight>>(
      "/api/market/insight"
    );
    return res.data.result;
  },
};