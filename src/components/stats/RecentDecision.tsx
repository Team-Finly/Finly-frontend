import { useState } from 'react';
import RecentDecisionCard from '@/components/stats/RecentDecisionCard';
import CalculationInfoModal from '@/components/stats/CalculationInfoModal';
import CautionIcon from '@/assets/images/stats_caution.svg';
import NoIcon from '@/assets/images/stats_no_card_icon.svg';

const MOCK_DATA = {
  isSuccess: true,
  code: 'COMMOM200',
  message: '성공적으로 요청을 처리했습니다.',
  result: [
    {
      stockName: '테슬라',
      emotion: 'ANXIETY',
      tradeType: '매도',
      price: 74500,
      date: '2026-01-17',
      quantity: 5,
      decisionResult: -5,
    },
    {
      stockName: '테슬라',
      emotion: 'ANXIETY',
      tradeType: '매도',
      price: 74500,
      date: '2025-8-15',
      quantity: 5,
      decisionResult: -10,
    },
  ],
};

const RecentDecision = () => {
  const decisions = MOCK_DATA.result;
  const isEmpty = !decisions || decisions.length === 0;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <div className="text-[16px] font-semibold text-gray-700">
            최근 판단 결과
          </div>
          <img
            onClick={() => setIsModalOpen(true)}
            src={CautionIcon}
            alt="경고 아이콘"
            className="h-4 w-4 cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-4">
          {isEmpty ? (
            <div className="flex flex-col items-center gap-2 rounded-[12px] border-[1.2px] border-gray-100 bg-white px-4 py-5">
              <img
                className="h-[26px] w-[29px]"
                src={NoIcon}
                alt="기록 없음 아이콘"
              />
              <div className="text-[14px] font-medium text-gray-300">
                기록된 조각이 없어요
              </div>
            </div>
          ) : (
            decisions.map((item, index) => (
              <RecentDecisionCard
                key={`${item.stockName}-${index}`}
                data={item}
              />
            ))
          )}
        </div>
      </div>
      <CalculationInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default RecentDecision;
