import React from 'react';
import Close from '@/assets/icons/close-bright.svg';

interface SearchHistoryProps {
  keyword: string;
  onClick: () => void;
  onDelete: () => void;
}

const SearchHistory = ({ keyword, onClick, onDelete }: SearchHistoryProps) => {
  return (
    <div className="flex h-13 items-center justify-between px-5">
      <button className="cursor-pointer text-gray-500" onClick={onClick}>
        {keyword}
      </button>
      <button onClick={onDelete} className="cursor-pointer">
        <img src={Close} alt="검색 기록 삭제" className="h-2.25 w-2.25" />
      </button>
    </div>
  );
};

export default SearchHistory;
