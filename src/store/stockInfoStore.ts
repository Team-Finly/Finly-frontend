import { stockInfoApi } from '@/apis/stockApi';
import type { StockInfo } from '@/types/stock';
import { create } from 'zustand';

interface stockInfoState {
  stockMap: Record<string, StockInfo>;
  isLoaded: boolean;
  fetchStocks: () => Promise<void>;
}

export const stockInfoStore = create<stockInfoState>((set) => ({
  stockMap: {},
  isLoaded: false,

  fetchStocks: async () => {
    const res = await stockInfoApi.getStocks();

    const map = res.result.reduce((acc, stock) => {
      acc[stock.symbol] = stock;
      return acc;
    }, {} as Record<string, StockInfo>);

    set({
      stockMap: map,
      isLoaded: true,
    });
  },
}));
