import React, { useState } from 'react';
import Before from '../../assets/icons/before.svg';
import EmotionFilterButton from '@/components/record/EmotionFilterButton';
import RecordDetailFragment from '@/components/record/RecordDetailFragment';
import { useNavigate } from 'react-router-dom';
import { EMOTIONS } from '@/constants/emtions';

const MOCK_DATA = [
  {
    id: 1,
    emotion: 'CONFIDENCE',
  },
  {
    id: 2,
    emotion: 'ANXIETY',
  },
  {
    id: 3,
    emotion: 'CALM',
  },
  {
    id: 4,
    emotion: 'GREED',
  },
  {
    id: 5,
    emotion: 'GREED',
  },
];

const SearchResultPage = () => {
  const navigate = useNavigate();
  const [clickedFilter, setClickedFilter] = useState('ALL');

  const filteredData =
    clickedFilter === 'ALL'
      ? MOCK_DATA
      : MOCK_DATA.filter((item) => item.emotion === clickedFilter);

  return (
    <div>
      <div className="fixed top-0 z-1 w-full max-w-120 bg-white">
        <div className="mt-4 flex h-15 items-center gap-5.5 bg-white px-4">
          <button onClick={() => navigate(-1)}>
            <img src={Before} alt="이전" className="h-4 w-2 cursor-pointer" />
          </button>
          <div className="flex h-12.5 flex-1 items-center rounded-xl border-[1.2px] border-gray-100 bg-gray-50/60 px-3.75">
            <p className="text-gray-700">"삼성전자"</p>
            <p className="font-normal text-gray-700">&nbsp;검색 결과</p>
          </div>
        </div>
      </div>
      <div className="scrollbar-hide mt-19 mb-6 flex gap-2 overflow-x-auto px-4 pt-4 pb-2">
        <EmotionFilterButton
          label="ALL"
          isSelected={clickedFilter === 'ALL'}
          onClick={() => setClickedFilter('ALL')}
          px={16}
        />
        {EMOTIONS.map((emotion) => (
          <EmotionFilterButton
            key={emotion.key}
            label={emotion.label}
            icon={emotion.icon}
            isSelected={clickedFilter === emotion.key}
            onClick={() => setClickedFilter(emotion.key)}
          />
        ))}
      </div>
      <div className="mb-2 flex flex-col gap-2 px-4">
        {filteredData.map((item) => {
          const emotionObj = EMOTIONS.find((e) => e.key === item.emotion);
          return <RecordDetailFragment key={item.id} emotion={emotionObj} />;
        })}
      </div>
    </div>
  );
};

export default SearchResultPage;
