import SummaryCard from '@/components/stats/SummaryCard';
import PriceDistribution from '@/components/stats/PriceDistribution';
import RecentDecision from '@/components/stats/RecentDecision';
import { useStatsStore } from '@/store/statsStockStore';
import { useStockSummary } from '@/hooks/useStockTab';
import type { StockSummaryResult } from '@/types/stats';
import { apiRenderGuard } from '@/utils/renderGuard';
import { UniversalSkeleton } from '@/components/UniversalSkeleton';

const SUMMARY_CONFIG = [
  { key: 'averageBuyPrice', label: '평균 매수 가액', unit: '원' },
  { key: 'currentPrice', label: '현재가', unit: '원' },
  { key: 'totalBuyCount', label: '누적 매수 횟수', unit: '회' },
  { key: 'maxHoldingDays', label: '최대 보유 기간', unit: '일' },
] as const;

const StockTabSkeleton = () => (
  <div className="flex w-full flex-1 flex-col gap-5 px-4 py-5">
    <div className="grid grid-cols-2 gap-4 rounded-[12px] border-[1.2px] border-gray-100 bg-white p-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="rounded-[12px] bg-gray-50 p-4">
          <UniversalSkeleton className="mb-2 h-[14px] w-[70px] rounded-sm bg-gray-200" />
          <UniversalSkeleton className="h-[22px] w-[100px] rounded-md bg-gray-200" />
        </div>
      ))}
    </div>
    <div className="rounded-[8px] border-[1.2px] border-gray-100 bg-white p-5">
      <UniversalSkeleton className="mb-1 h-[24px] w-[120px] rounded-md bg-gray-50" />
      <UniversalSkeleton className="mb-6 h-[18px] w-[180px] rounded-md bg-gray-50" />
      <UniversalSkeleton className="h-[120px] w-full rounded-[10px]" />
    </div>
    <div className="flex flex-col gap-4">
      <UniversalSkeleton className="h-[24px] w-[120px] rounded-md bg-gray-200" />
      <UniversalSkeleton className="h-[84px] w-full rounded-[12px]" />
    </div>
  </div>
);

const StockTab = () => {
  const { currentStock } = useStatsStore();
  const { data, isLoading, isError } = useStockSummary(currentStock?.symbol);

  const guardUI = apiRenderGuard(
    isLoading,
    isError,
    data,
    <StockTabSkeleton />,
  );
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
