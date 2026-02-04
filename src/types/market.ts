export interface MarketIndex {
  kospi: number;
  kosdaq: number;
  fearGreed: number;
  fearGreedStatus: string;
  updatedAt: string;
}

export interface MarketIndexApiResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: MarketIndex;
}