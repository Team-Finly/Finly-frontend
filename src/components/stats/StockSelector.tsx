import SelectBtn from '@/assets/images/stats_stockSelect.svg';
import DefaultLogo from '@/assets/icons/stats_no_stock.svg';
import type { StockInfo } from '@/types/stock';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';

interface Props {
  stocks: StockInfo[];
  selectedStock: StockInfo;
  onSelect: (stock: StockInfo) => void;
}

const StockSelector = ({ stocks, selectedStock, onSelect }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (stock: StockInfo) => {
    onSelect(stock);
    setIsOpen(false);
  };

  useClickAway(containerRef, () => {
    setIsOpen(false);
  });

  return (
    <div className="relative w-full px-8" ref={containerRef}>
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={handleToggle}
      >
        <div className="flex items-center gap-2">
          <img
            className="h-[24px] w-[24px] rounded-full object-cover"
            src={selectedStock.logoUrl || DefaultLogo}
            alt={selectedStock.name}
          />
          <div className="text-[17px] font-semibold text-gray-900">
            {selectedStock.name}
          </div>
        </div>
        <img className="w-[15px]" src={SelectBtn} alt="종목 선택 화살표" />
      </div>

      {isOpen && (
        <div className="absolute top-[calc(100%+12px)] right-4 left-4 z-[100] overflow-hidden rounded-b-[12px] bg-white pt-[13px] pb-[20px] drop-shadow-[0_6px_12px_rgba(217,217,217,0.5)]">
          <div className="scrollbar-hide flex max-h-[328px] flex-col overflow-y-auto px-[17px]">
            {stocks.map((stock) => {
              const isSelected = stock.symbol === selectedStock.symbol;
              return (
                <div
                  key={stock.symbol}
                  className={`flex cursor-pointer flex-row items-center justify-start gap-2 rounded-[10px] px-6 py-2 ${
                    isSelected ? 'bg-gray-50' : 'hover:bg-gray-50/50'
                  }`}
                  onClick={() => handleSelect(stock)}
                >
                  <img
                    className="h-[24px] w-[24px] rounded-full border border-gray-100 object-cover"
                    src={stock.logoUrl || DefaultLogo}
                    alt={stock.name}
                    onError={(e) => (e.currentTarget.src = DefaultLogo)}
                  />
                  <div
                    className={`text-[17px] ${
                      isSelected
                        ? 'text-secondary font-semibold'
                        : 'font-medium text-gray-900'
                    }`}
                  >
                    {stock.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default StockSelector;
