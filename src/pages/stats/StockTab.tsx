import SummaryCard from '@/components/stats/SummaryCard';
import PriceDistribution from '@/components/stats/PriceDistribution';
import RecentDecision from '@/components/stats/RecentDecision';
import { useStatsStore } from '@/store/statsStockStore';
import { useStockSummary } from '@/hooks/useStockTab';
import type { StockSummaryResult } from '@/types/stats';
import { apiRenderGuard } from '@/utils/renderGuard';

const SUMMARY_CONFIG = [
  { key: 'averageBuyPrice', label: '평균 매수 가액', unit: '원' },
  { key: 'currentPrice', label: '현재가', unit: '원' },
  { key: 'totalBuyCount', label: '누적 매수 횟수', unit: '회' },
  { key: 'maxHoldingDays', label: '최대 보유 기간', unit: '일' },
] as const;

const StockTab = () => {
  const { currentStock } = useStatsStore();
  const { data, isLoading, isError } = useStockSummary(currentStock?.symbol);

  const guardUI = apiRenderGuard(isLoading, isError, data);
  if (guardUI !== undefined) return guardUI;

  const summaryData = data as StockSummaryResult;

  return (
    <div className="flex w-full flex-1 flex-col gap-5 px-4 py-5">
      <div className="grid grid-cols-2 gap-4 rounded-[12px] border-[1.2px] border-gray-100 bg-white p-4">
        {SUMMARY_CONFIG.map((config) => {
          const rawValue = summaryData[config.key as keyof StockSummaryResult];
          const formattedValue = `${rawValue.toLocaleString()}${config.unit}`;
          return (
            <SummaryCard
              key={config.key}
              title={config.label}
              value={formattedValue}
            />
          );
        })}
      </div>
      <PriceDistribution />
      <RecentDecision />
    </div>
  );
};

export default StockTab;
