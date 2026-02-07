import { create } from 'zustand';
import type { StockInfo } from '@/types/stock';

interface StatsState {
  currentStock: StockInfo | null;
  setCurrentStock: (stock: StockInfo) => void;
  clearStats: () => void;
}

export const useStatsStore = create<StatsState>((set) => ({
  currentStock: null,
  setCurrentStock: (stock) => set({ currentStock: stock }),
  clearStats: () => set({ currentStock: null }),
}));
