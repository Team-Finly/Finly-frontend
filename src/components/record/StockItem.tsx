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
    const escaped = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = text.split(new RegExp(`(${escaped})`, 'gi'));

    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
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
      {stock.logoUrl ? (
        <img
          src={stock.logoUrl}
          alt={`${stock.name} 로고`}
          className="h-8 w-8 rounded-full object-contain"
        />
      ) : (
        <div className="h-8 w-8 rounded-full bg-gray-100"></div>
      )}

      <p className="ml-3.5 text-gray-900">
        {handleHighlight(stock.name, keyword)}
      </p>
    </button>
  );
};

export default StockItem;
