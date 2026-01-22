import React, { useState } from 'react';
import CloseHeader from '@/components/record/CloseHeader';
import RecordDetailFragment from '@/components/record/RecordDetailFragment';
import { useLocation } from 'react-router-dom';
import { EMOTIONS } from '@/constants/emtions';
import PeriodFilterButton from '@/components/record/PeriodFilterButton';

const FragmentDetailPage = () => {
  const location = useLocation();
  const { selectedEmotion } = location.state || {};
  const [clickedPeriod, setClickedPeriod] = useState('ALL');

  const emotion = EMOTIONS.find((e) => e.key === selectedEmotion?.emotion);
  if (!selectedEmotion || !emotion) return null;

  const periods = ['ALL', '1개월', '3개월', '6개월', '1년'];

  return (
    <div>
      <CloseHeader title={`${emotion.label} 조각함`} />
      <div className="px-4 pt-19">
        <div className="mt-7.5 mb-5 flex flex-col gap-0.5 text-[22px]">
          <p className="font-semibold">
            지금까지 총{' '}
            <span className="text-secondary font-bold">
              {selectedEmotion.count}
            </span>
            개의
          </p>
          <p className="font-semibold">확신 조각을 수집했어요!</p>
        </div>
        <div className="flex gap-2.5">
          {periods.map((period) => (
            <PeriodFilterButton
              key={period}
              label={period}
              isSelected={period === clickedPeriod}
              onClick={() => setClickedPeriod(period)}
            />
          ))}
        </div>
        <div className="mt-9 mb-2.5 flex flex-col gap-2.5">
          <RecordDetailFragment emotion={emotion} />
          <RecordDetailFragment emotion={emotion} />
        </div>
      </div>
    </div>
  );
};

export default FragmentDetailPage;
