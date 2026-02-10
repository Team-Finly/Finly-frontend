import SimpleProgressBar from '@/components/stats/SimpleProgressBar';
import { useStatsStore } from '@/store/statsStockStore';
import { usePriceDistribution } from '@/hooks/useStockTab';
import { apiRenderGuard } from '@/utils/renderGuard';
import type { StockDistributionResult } from '@/types/stats';
import { UniversalSkeleton } from '@/components/UniversalSkeleton';

const PriceDistributionSkeleton = () => (
  <div className="rounded-[8px] border-[1.2px] border-gray-100 bg-white p-5">
    <UniversalSkeleton className="mb-1 h-[24px] w-[120px] rounded-md bg-gray-50" />
    <UniversalSkeleton className="mb-6 h-[18px] w-[180px] rounded-md bg-gray-50" />
    <UniversalSkeleton className="h-[120px] w-full rounded-[10px]" />
  </div>
);

const PriceDistribution = () => {
  const { currentStock } = useStatsStore();
  const { data, isLoading, isError } = usePriceDistribution(
    currentStock?.symbol,
  );

  const guardUI = apiRenderGuard(
    isLoading,
    isError,
    data,
    <PriceDistributionSkeleton />,
  );
  if (guardUI !== undefined) return guardUI;

  const { distributions } = data as StockDistributionResult;

  return (
    <div className="rounded-[12px] border-[1.2px] border-gray-100 bg-white p-5">
      <div className="mb-1 text-[16px] font-semibold text-gray-700">
        가격대별 기록 분포
      </div>
      <div className="mb-6 text-[12px] font-medium text-gray-300">
        주로 어떤 가격대에서 결정하셨나요?
      </div>
      <div className="flex flex-col gap-5">
        {distributions.map((item, index) => {
          const barColor = item.isFocused ? 'bg-secondary' : 'bg-gray-300';

          return (
            <SimpleProgressBar
              key={index}
              label={item.displayRange}
              percentage={item.ratio}
              colorClass={barColor}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PriceDistribution;
