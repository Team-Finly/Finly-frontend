import React from 'react';
import Close from '@/assets/icons/close-bright.svg';

const SearchHistory = () => {
  return (
    <div className="flex h-13 items-center justify-between px-5">
      <p className="text-gray-500">삼성전자</p>
      <button onClick={() => {}} className="cursor-pointer">
        <img src={Close} alt="검색 기록 삭제" className="h-2.25 w-2.25" />
      </button>
    </div>
  );
};

export default SearchHistory;
