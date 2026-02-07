import TimeIcon from '@/assets/icons/stats_time.svg';
import TimeModal from '@/components/stats/TimeModal';
import { useState } from 'react';
import { useStatsStore } from '@/store/statsStockStore';
import { useGoldenTime } from '@/hooks/useEmotionTab';
import { apiRenderGuard } from '@/utils/renderGuard';
import type { GoldenTimeResult } from '@/types/stats';

// 높이 계산
const getBarHeight = (percent: number) => {
  if (percent <= 20) return 10;
  if (percent <= 40) return 20;
  if (percent <= 60) return 30;
  if (percent <= 80) return 40;
  return 50;
};

const GoldenTime = () => {
  const { currentStock } = useStatsStore();
  const { data, isLoading, isError } = useGoldenTime(currentStock?.symbol);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const guardUI = apiRenderGuard(isLoading, isError, data);
  if (guardUI !== undefined) return guardUI;

  const result = data as GoldenTimeResult;
  const { summary, session } = result;

  return (
    <div className="flex flex-col gap-4 rounded-xl border-[1.2px] border-gray-100 bg-white p-5">
      <div className="flex flex-row justify-between">
        <div className="text-[16px] font-semibold text-gray-700">
          감정 골든 타임
        </div>
        <img
          src={TimeIcon}
          alt="가격대 설정 설명"
          className="h-[18px] w-[18px] cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <div className="flex w-full flex-row items-end justify-between">
        {session.map((item) => {
          const isPeak = item.session === summary.goldenTime;
          const barHeight = getBarHeight(item.percent);
          return (
            <div
              key={item.session}
              className="flex w-[72px] flex-col items-center justify-end gap-2"
            >
              {isPeak && (
                <div className="text-secondary text-[12px] font-semibold">
                  Peak!
                </div>
              )}
              <div
                style={{ height: `${barHeight}px` }}
                className={`w-full rounded-t-[8px] ${
                  isPeak
                    ? 'bg-secondary from-secondary to-blue-bg bg-gradient-to-b'
                    : 'bg-gray-50'
                }`}
              />
              <div
                className={`text-[11px] ${isPeak ? 'text-secondary' : 'text-gray-500'}`}
              >
                {item.sessionName}
              </div>
            </div>
          );
        })}
      </div>
      <div className="my-1 w-full rounded-[22.5px] bg-gray-50/60 py-3 text-center text-[13px] text-gray-500">
        “기현님은 <b>{summary.goldenTimeName}</b>에 감정 기록이 가장 활발해요!”
      </div>
      <TimeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default GoldenTime;
