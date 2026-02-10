export interface StockInfo {
  isActive: boolean;
  isin: string;
  logoUrl: string;
  marketType: 'KOSPI' | 'KOSDAQ';
  name: string;
  symbol: string;
}