import type { ApiResponse } from "@/types/types";
import { api } from "./client";
import type { MarketIndex, MarketInsight } from "@/types/market";

export const marketApi = {
  getMarketIndex: async (): Promise<MarketIndex> => {
    const res = await api.get<ApiResponse<MarketIndex>>(
      "/api/markets/index"
    );
    return res.data.result;
  },

  getMarketInsight: async () => {
    const res = await api.get<ApiResponse<MarketInsight>>(
      "/api/markets/insight"
    );
    return res.data.result;
  },
};