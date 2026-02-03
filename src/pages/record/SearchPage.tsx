import React from 'react';
import Before from '@/assets/icons/before.svg';
import RecordSearch2 from '@/assets/icons/record_search2.svg';
import SearchHistory from '@/components/record/SearchHistory';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const navigate = useNavigate();

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
          />
          <button
            onClick={() => navigate('/search/result')}
            onMouseDown={(e) => e.preventDefault()}
            className="cursor-pointer"
          >
            <img src={RecordSearch2} alt="검색" className="h-3.75 w-3.75" />
          </button>
        </div>
      </div>
      <div>
        <h3 className="mb-4 font-semibold">최근 검색</h3>
        <div className="flex flex-col divide-y-[1.2px] divide-gray-100">
          <SearchHistory />
          <SearchHistory />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
