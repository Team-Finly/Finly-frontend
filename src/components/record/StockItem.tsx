import type { Stock } from '@/types/record';
import React from 'react';

interface StockItemProps {
  stock: Stock;
  keyword: string;
  onClick: (stock: Stock) => void;
}

const StockItem = ({ stock, onClick, keyword }: StockItemProps) => {
  const handleHighlight = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return text;
    }
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

    return (
      <span>
        {parts.map((part, index) =>
          part.toLocaleLowerCase() === highlight.toLocaleLowerCase() ? (
            <span key={index} className="text-secondary">
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          ),
        )}
      </span>
    );
  };

  return (
    <button
      className="flex cursor-pointer items-center justify-start"
      onClick={() => onClick(stock)}
    >
      <img
        src={stock.logoUrl}
        alt={`${stock.name} 로고`}
        className="mr-3.5 h-8 w-8 rounded-full object-contain"
      />
      <p className="text-gray-900">{handleHighlight(stock.name, keyword)}</p>
    </button>
  );
};

export default StockItem;
