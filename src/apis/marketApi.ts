import { api } from "./client";
import type { MarketApiResponse, MarketIndex } from "@/types/market";

export const marketApi = {
  getMarketIndex: async (): Promise<MarketIndex> => {
    const res = await api.get<MarketApiResponse>("/api/market/index");
    return res.data.result;
  },
};