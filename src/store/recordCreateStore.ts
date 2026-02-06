import { create } from 'zustand';
import type { TradeActionType } from '@/types/record';

interface RecordCreateState {
  selectedDate: Date | null;
  stockId: number | null;
  stockName: string | null;
  symbol: string | null;
  selectedTradeAction: TradeActionType | null;
  unitPrice: string | null;
  quantity: string | null;
  clickedEmotion: string | null;
  emotionLevel: number | null;
  memo: string;

  setStock: (id: number, name: string, symbol: string) => void;
  setField: <K extends keyof RecordCreateState>(
    field: K,
    value: RecordCreateState[K],
  ) => void;
  reset: () => void;
}

const initialState = {
  selectedDate: null,
  stockId: null,
  stockName: null,
  symbol: null,
  selectedTradeAction: null,
  unitPrice: null,
  quantity: null,
  clickedEmotion: null,
  emotionLevel: null,
  memo: '',
};

export const useRecordCreateStore = create<RecordCreateState>((set) => ({
  ...initialState,

  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  setStock: (id, name, symbol) => set({ stockId: id, stockName: name, symbol }),
  reset: () => set(initialState),
}));
