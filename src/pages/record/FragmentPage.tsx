import React from 'react';
import TitleHeader from '@/components/record/TitleHeader';
import EmotionCard from '@/components/record/EmotionCard';
import DonutChart from '@/components/record/DonutChart';
import { useNavigate } from 'react-router-dom';
import { useFragmentSummary } from '@/hooks/useFragmentSummary';
import { EMOTION_CHART_MAP } from '@/constants/emotions';
import Message from '@/assets/icons/message.svg';
import PlusWhite from '@/assets/icons/plus-white.svg';

const FragmentPage = () => {
  const navigate = useNavigate();
  const { data: fragmentSummary } = useFragmentSummary();

  return (
    <div>
      <TitleHeader title="조각 모음함" />
      <div className="mt-19 flex w-full flex-col items-center pt-7 pb-5">
        <p className="mb-1.5 text-sm text-[#6E757D]/80">지금까지 구름님은</p>
        <h4 className="mb-5.5 text-xl font-semibold text-gray-900">
          총 {fragmentSummary?.totalCount || 0}개의 조각을 수집했어요
        </h4>
        <DonutChart />
        <div className="bg-blue-bg mt-2.5 flex items-center justify-center rounded-[22.5px] text-gray-700">
          <p className="px-3 py-2 text-xs">
            {fragmentSummary?.dominantType ? (
              <>
                현재{' '}
                <span className="font-semibold">
                  '{EMOTION_CHART_MAP[fragmentSummary.dominantType].label}'
                </span>{' '}
                조각이 가장 지배적이에요!
              </>
            ) : (
              '첫 조각을 남겨주세요!'
            )}
          </p>
        </div>
      </div>
      <div className="h-4 w-full bg-gray-50"></div>
      <div className="px-4">
        <h2 className="mt-5 mb-4 text-[17px] font-semibold text-gray-900">
          마음 조각 분포
        </h2>
        {fragmentSummary && fragmentSummary?.typeSummary.length > 0 ? (
          <div className="mb-2 flex flex-col gap-2">
            {fragmentSummary?.typeSummary.map((item) => (
              <EmotionCard
                key={item.type}
                data={item}
                onClick={() => navigate(`/fragment/${item.type}?period=ALL`)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <img src={Message} alt="기록 없음" className="mt-[55px]" />
            <p className="mt-3 mb-[35px] text-sm text-gray-300">
              기록된 조각이 없어요
            </p>
            <button
              className="bg-secondary flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2"
              onClick={() => navigate('/record/create')}
            >
              <img src={PlusWhite} alt="기록 추가" className="h-3 w-3" />
              <p className="text-sm font-semibold text-white">기록하기</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FragmentPage;
