import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecordSearch1 from '../../assets/icons/record_search1.svg';
import FGI from '../../assets/images/fgi.png';
import ArrowRightThin from '../../assets/icons/arrow-right-thin.svg';
import Calendar from '../../components/record/Calendar';
import LinearBar from '../../components/record/LinearBar';
import EmptyFragment from '../../components/record/EmptyFragment';
import RecordFragment from '../../components/record/RecordFragment';
import FloatingButton from '../../components/record/FloatingButton';
import type {
  FragmentSummary,
  DailyFragmentResponse,
} from './../../types/record';

const RecordHomePage = () => {
  const navigate = useNavigate();
  const [fragmentSummary, setFragmentSummary] = useState<FragmentSummary>({
    totalFragmentCount: 34,
    emotionSummary: [
      { emotion: 'CALM', count: 5, ratio: 50 },
      { emotion: 'CONFIDENCE', count: 2, ratio: 20 },
      { emotion: 'ANXIETY', count: 2, ratio: 20 },
      { emotion: 'GREED', count: 1, ratio: 10 },
    ],
    dominantEmotion: 'CONFIDENCE',
  });

  const [dailyFragment, setDailyFragment] = useState<DailyFragmentResponse>({
    date: '2026-01-18',
    records: [
      {
        recordId: 1,
        instrumentName: '테슬라',
        tradeAction: '매수',
        unitPrice: 72400,
        emotion: 'ANXIETY',
        emotionIntensity: 4,
        recordedAt: '2026-01-06T09:30:00',
      },
      {
        recordId: 2,
        instrumentName: '삼성전자',
        tradeAction: '매도',
        unitPrice: 30000,
        emotion: 'CALM',
        emotionIntensity: 3,
        recordedAt: '2026-01-19T09:30:00',
      },
    ],
  });

  return (
    <div className="pt-4 pb-20">
      <div>
        <div className="absolute top-0 flex h-15 w-full items-center justify-between bg-white px-4 pt-4 text-gray-900">
          <h1 className="text-xl font-semibold">기록</h1>
          <button className="cursor-pointer" onClick={() => navigate('/')}>
            <img src={RecordSearch1} alt="검색 아이콘" />
          </button>
        </div>
        <div className="bg-gray-50 px-4 pt-2 pb-4">
          <div className="mb-2 flex items-center justify-between rounded-[22.5px] bg-white pr-4 pl-2">
            <div className="flex h-9.5 items-center gap-1">
              <img className="w-6" src={FGI} alt="공포탐욕 지수 아이콘" />
              <p className="text-[13px] text-gray-700">공포탐욕 지수(FGI)</p>
            </div>
            <div className="flex gap-1 text-[13px] text-gray-700">
              <p className="font-semibold">87%</p>
              <p>탐욕</p>
            </div>
          </div>
          <Calendar />
        </div>
        <div className="px-4">
          <h2 className="mt-5 mb-5.5 text-[17px] font-semibold">
            총{' '}
            <span className="text-secondary">
              {fragmentSummary.totalFragmentCount}
            </span>
            개의 마음 조각을 모았어요!
          </h2>
          <LinearBar
            emotions={fragmentSummary.emotionSummary}
            fragmentSummary={fragmentSummary}
          />
        </div>
        <div className="h-4 bg-gray-50"></div>
        <div className="mt-5 px-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[17px] font-semibold text-gray-900">
              TODAY 마음 조각
            </h2>
            {dailyFragment.records && dailyFragment.records.length > 0 && (
              <button className="flex cursor-pointer items-center gap-0.75">
                <p className="text-[13px] text-gray-500">전체 보기</p>
                <img src={ArrowRightThin} alt="전체 보기" />
              </button>
            )}
          </div>
          {dailyFragment.records && dailyFragment.records.length > 0 ? (
            <div className="flex flex-col gap-1.5">
              {dailyFragment.records.map((record) => (
                <RecordFragment key={record.recordId} data={record} />
              ))}
            </div>
          ) : (
            <EmptyFragment />
          )}
        </div>
      </div>
      <div className="sticky top-160 flex justify-end pr-4">
        <FloatingButton />
      </div>
    </div>
  );
};

export default RecordHomePage;
