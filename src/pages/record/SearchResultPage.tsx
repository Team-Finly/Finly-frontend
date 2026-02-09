import React, { useState } from 'react';
import Before from '@/assets/icons/before.svg';
import EmotionFilterButton from '@/components/record/EmotionFilterButton';
import RecordDetailFragment from '@/components/record/RecordDetailFragment';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { EMOTIONS } from '@/constants/emotions';
import { useRecordSearch } from '@/hooks/useRecordSearch';
import Message from '@/assets/icons/message.svg';
import { stockInfoStore } from '@/store/stockInfoStore';
import type { TradeActionType, EmotionType } from '@/types/record';
import FragmentDetailSkeleton from '@/pages/record/FragmentDetailSkeleton';

const SearchResultPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const [clickedFilter, setClickedFilter] = useState<EmotionType | 'ALL'>(
    'ALL',
  );

  const { data, isLoading } = useRecordSearch({
    keyword,
    emotionCode: clickedFilter === 'ALL' ? undefined : clickedFilter,
  });
  const stockMap = stockInfoStore((state) => state.stockMap);

  return (
    <div>
      <div className="fixed top-0 z-1 w-full max-w-120 bg-white">
        <div className="mt-4 flex h-15 items-center gap-5.5 bg-white px-4">
          <button onClick={() => navigate(-1)}>
            <img src={Before} alt="이전" className="h-4 w-2 cursor-pointer" />
          </button>
          <div className="flex h-12.5 flex-1 items-center rounded-xl border-[1.2px] border-gray-100 bg-gray-50/60 px-3.75">
            <p className="text-gray-700">"{keyword}"</p>
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
        {isLoading ? (
          <div className="flex flex-col gap-2">
            {[...Array(4)].map((_, i) => (
              <FragmentDetailSkeleton key={i} />
            ))}
          </div>
        ) : data?.records.length === 0 ? (
          <div className="mt-[217px] flex h-[65px] w-full flex-col items-center justify-between rounded-xl">
            <img src={Message} alt="메시지 아이콘" className="w-[30px]" />
            <p className="text-gray-300">검색 결과가 없어요</p>
          </div>
        ) : (
          data?.records.map((record) => {
            const emotionObj = EMOTIONS.find(
              (e) => e.key === record.emotionCode,
            );

            const fragment = {
              fragmentId: record.recordId,
              emotionCode: record.emotionCode,
              emotionName: emotionObj?.label || '',
              memo: record.memo,
              recordDate: record.recordDate,
              unitPrice: record.unitPrice,
              quantity: record.quantity,
              stock: {
                stockId: 0,
                stockName: stockMap[record.symbol]?.name || record.symbol,
                tradeAction: record.tradeAction as TradeActionType,
              },
            };

            return (
              <RecordDetailFragment
                key={record.recordId}
                onClick={() =>
                  navigate(
                    `/record/${fragment.recordDate}/${fragment.fragmentId}`,
                  )
                }
                fragment={fragment}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default SearchResultPage;
