import TimeIcon from '@/assets/icons/stats_time.svg';
import TimeModal from '@/components/stats/TimeModal';
import { useState } from 'react';

const GoldenTime = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 rounded-xl border-[1.2px] border-gray-100 bg-white p-5">
      <div className="flex flex-row justify-between">
        <div className="text-[16px] font-semibold text-gray-700">
          감정 골든 타임
        </div>
        <img
          src={TimeIcon}
          alt="가격대 설정 설명"
          className="h-[18px] w-[18px]"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex h-[83px] w-[72px] flex-col items-center justify-end gap-2">
          <div className="h-[30px] w-full rounded-t-[8px] bg-gray-50"></div>
          <div className="text-[11px] text-gray-500">장전</div>
        </div>
        <div className="flex h-[83px] w-[72px] flex-col items-center justify-end gap-2">
          <div className="text-secondary text-[12px] font-semibold">Peak!</div>
          <div className="bg-secondary from-secondary to-blue-bg h-[40px] w-full rounded-t-[8px] bg-gradient-to-b"></div>
          <div className="text-[11px] text-gray-500">오전</div>
        </div>
        <div className="flex h-[83px] w-[72px] flex-col items-center justify-end gap-2">
          <div className="h-[30px] w-full rounded-t-[8px] bg-gray-50"></div>
          <div className="text-[11px] text-gray-500">오후</div>
        </div>
        <div className="flex h-[83px] w-[72px] flex-col items-center justify-end gap-2">
          <div className="h-[10px] w-full rounded-t-[8px] bg-gray-50"></div>
          <div className="text-[11px] text-gray-500">장마감</div>
        </div>
      </div>
      <div className="my-1 w-full rounded-[22.5px] bg-gray-50/60 py-3 text-center text-[13px] text-gray-500">
        “기현님은 <b>오전 장</b>에 감정 기록이 가장 활발해요!”
      </div>
      <TimeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default GoldenTime;
