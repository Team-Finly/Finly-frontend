import UpIcon from '@/assets/images/stats_up.svg';
import DownIcon from '@/assets/images/stats_down.svg';
import FlatIcon from '@/assets/images/stats_flat.svg';
import { useFearIndex } from '@/hooks/useStatsAnalysis';
import { apiRenderGuard } from '@/utils/renderGuard';
import type { FearIndexResult } from '@/types/stats';

const RelationFear = () => {
  const { data, isLoading, isError } = useFearIndex();

  const guardUI = apiRenderGuard(isLoading, isError, data);
  if (guardUI !== undefined) return guardUI;

  const { fearIndex, changeDirection, changeValue, phrase } =
    data as FearIndexResult;

  // 공포 지수 방향에 따른 변화 처리
  const directionConfig = {
    UP: { icon: UpIcon, textColor: 'text-stock-buy', showValue: true },
    DOWN: { icon: DownIcon, textColor: 'text-stock-sell', showValue: true },
    SAME: { icon: FlatIcon, textColor: 'text-gray-300', showValue: false },
  };

  const currentConfig = directionConfig[changeDirection];

  return (
    <div className="rounded-[12px] border-[1.2px] border-gray-100 bg-white p-4">
      <div className="mb-3 text-[14px] font-semibold text-gray-500">
        하락장 공포 지수
      </div>
      <div className="mb-1 flex flex-row items-baseline">
        <div className="mr-1.5 text-[26px] font-semibold text-gray-900">
          {fearIndex}
        </div>
        <img
          src={currentConfig.icon}
          alt={changeDirection}
          className="mr-0.5"
        />
        {currentConfig.showValue && (
          <div className={`${currentConfig.textColor} text-[12px] font-medium`}>
            {changeValue}
          </div>
        )}
      </div>
      <div className="text-[11px] font-medium text-gray-300">{phrase}</div>
    </div>
  );
};

export default RelationFear;
