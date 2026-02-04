import { api } from "./client";
import type { MarketIndexApiResponse, MarketIndex } from "@/types/market";

export const marketApi = {
  getMarketIndex: async (): Promise<MarketIndex> => {
    const res = await api.get<MarketIndexApiResponse>("/api/market/index");
    return res.data.result;
  },
};