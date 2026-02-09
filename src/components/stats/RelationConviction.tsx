import { useConvictionScore } from '@/hooks/useStatsAnalysis';
import { apiRenderGuard } from '@/utils/renderGuard';
import type { ConvictionScoreResult } from '@/types/stats';

const RelationConviction = () => {
  const { data, isLoading, isError } = useConvictionScore();

  const guardUI = apiRenderGuard(isLoading, isError, data);
  if (guardUI !== undefined) return guardUI;

  const { convictionScore, phrase, status } = data as ConvictionScoreResult;

  const statusLabel = {
    LOW: 'Low',
    MID: 'Mid',
    GOOD: 'Good',
    HIGH: 'High',
  }[status];

  return (
    <div className="rounded-[12px] border-[1.2px] border-gray-100 bg-white p-4">
      <div className="mb-3 text-[14px] font-semibold text-gray-500">
        매수 확신도
      </div>
      <div className="mb-1 flex flex-row items-baseline">
        <div className="text-secondary mr-1.5 text-[26px] font-semibold">
          {convictionScore}
        </div>
        <div className="text-[12px] font-medium text-gray-300">
          {statusLabel}
        </div>
      </div>
      <div className="text-[11px] font-medium text-gray-300">{phrase}</div>
    </div>
  );
};

export default RelationConviction;
