export interface MarketApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

export interface MarketIndex {
  kospi: number;
  kosdaq: number;
  fearGreed: number;
  fearGreedStatus: string;
  updatedAt: string;
}

export interface MarketInsight {
  stockName: string;
  message: string;
  dominantEmotion: string;
  buySellRatio: string;
  confidenceLevel: string;
}