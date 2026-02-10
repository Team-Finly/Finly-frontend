import React, { useEffect, useState } from 'react';
import CloseHeader from '@/components/record/CloseHeader';
import RecordDetailFragment from '@/components/record/RecordDetailFragment';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { EMOTIONS } from '@/constants/emotions';
import PeriodFilterButton from '@/components/record/PeriodFilterButton';
import { useFragmentList } from '@/hooks/useFragmentList';
import type { EmotionType, PeriodType } from '@/types/record';
import { PERIODS } from '@/constants/period';
import Message from '@/assets/icons/message.svg';

const FragmentDetailPage = () => {
  const navigate = useNavigate();
  const { emotionType } = useParams<{ emotionType: EmotionType }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPeriod = (searchParams.get('period') as PeriodType) || 'ALL';

  const { data: fragmentList, isLoading } = useFragmentList({
    boxType: emotionType,
    periodKey: currentPeriod,
  });
  const [totalCount, setTotalCount] = useState<number>(0);
  useEffect(() => {
    if (
      fragmentList?.summary?.totalCount !== undefined &&
      currentPeriod === 'ALL'
    ) {
      setTotalCount(fragmentList.summary.totalCount);
    }
  }, [fragmentList, currentPeriod]);

  const emotion = EMOTIONS.find((e) => e.key === emotionType);
  if (!emotion) return null;

  const handlePeriod = (key: PeriodType) => {
    setSearchParams({ period: key }, { replace: true });
  };

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-white">
      <CloseHeader
        title={`${emotion.label} 조각함`}
        onClick={() => navigate(-1)}
      />
      <div className="px-4 pt-19">
        <div className="mt-7.5 mb-5 flex flex-col gap-0.5 text-[22px]">
          <p className="font-semibold">
            지금까지 총{' '}
            <span className="text-secondary font-bold">{totalCount}</span>
            개의
          </p>
          <p className="font-semibold">
            {`${emotion.label}`} 조각을 수집했어요!
          </p>
        </div>
        <div className="mb-9 flex gap-2.5">
          {PERIODS.map((period) => (
            <PeriodFilterButton
              key={period.key}
              label={period.label}
              isSelected={period.key === currentPeriod}
              onClick={() => handlePeriod(period.key)}
            />
          ))}
        </div>
      </div>
      <div className="scrollbar-hide mx-4 flex-1 overflow-y-auto">
        {isLoading ? null : fragmentList &&
          fragmentList?.fragments.length > 0 ? (
          <div className="mb-2.5 flex flex-col gap-2.5">
            {fragmentList?.fragments.map((fragment) => (
              <RecordDetailFragment
                key={fragment.fragmentId}
                fragment={fragment}
                onClick={() =>
                  navigate(
                    `/record/${fragment.recordDate}/${fragment.fragmentId}`,
                  )
                }
              />
            ))}
          </div>
        ) : (
          <div className="mt-[153px] flex flex-col items-center">
            <img src={Message} alt="조각 없음" />
            <p className="mt-3 text-sm text-gray-300">
              해당 기간 내 기록된 조각이 없어요
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FragmentDetailPage;
