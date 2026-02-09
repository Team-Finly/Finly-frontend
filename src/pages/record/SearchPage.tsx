import React, { useState } from 'react';
import Before from '@/assets/icons/before.svg';
import RecordSearch2 from '@/assets/icons/record_search2.svg';
import SearchHistory from '@/components/record/SearchHistory';
import { useNavigate } from 'react-router-dom';
import { EMOTIONS } from '@/constants/emotions';
import EmotionFilterButton from '@/components/record/EmotionFilterButton';
import { useRecentSearch } from '@/hooks/useRecentSearch';

const SearchPage = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const { data: recentKeywords, isLoading } = useRecentSearch();

  const handleSearch = () => {
    if (keyword.trim() !== '') {
      navigate(`/search/result?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="mt-4 px-4">
      <div className="mb-7.5 flex h-15 items-center gap-5.5">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <img src={Before} alt="이전" className="h-4 w-2" />
        </button>
        <div className="focus-within:border-secondary flex h-12.5 flex-1 gap-3.75 rounded-xl border-[1.2px] border-gray-100 bg-gray-50/60 px-3.75 focus:text-gray-900">
          <input
            type="text"
            placeholder="종목명, 메모 검색"
            className="flex-1 font-normal placeholder:text-gray-500/40 focus:outline-none"
            spellCheck={false}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSearch}
            onMouseDown={(e) => e.preventDefault()}
            className="cursor-pointer"
          >
            <img src={RecordSearch2} alt="검색" className="h-3.75 w-3.75" />
          </button>
        </div>
      </div>
      <div>
        <h3 className="mb-4 font-semibold text-gray-900">감정별 모아보기</h3>
        <div className="mb-7.5 flex w-full justify-between">
          {EMOTIONS.map((emotion) => (
            <EmotionFilterButton
              key={emotion.key}
              label={emotion.label}
              icon={emotion.icon}
              onClick={() => navigate(`/fragment/${emotion.key}?period=ALL`)}
            />
          ))}
        </div>
      </div>
      {isLoading ? (
        <p className="flex items-center justify-between text-gray-500">
          최근 검색어 로딩 중...
        </p>
      ) : recentKeywords && recentKeywords.length > 0 ? (
        <div>
          <h3 className="mb-4 font-semibold text-gray-900">최근 검색</h3>
          <div className="flex flex-col divide-y-[1.2px] divide-gray-100">
            {recentKeywords.map((keyword, index) => (
              <SearchHistory
                key={index}
                keyword={keyword}
                onClick={() =>
                  navigate(
                    `/search/result?keyword=${encodeURIComponent(keyword)}`,
                  )
                }
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SearchPage;
