import SelectBtn from '../../assets/images/stats_stockSelect.svg';
import type { Stock } from '../../types/stats';

interface Props {
  stocks: Stock[];
  selectedStock: Stock;
  onSelect: (stock: Stock) => void;
}

const StockSelector = ({ stocks, selectedStock, onSelect }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    const targetStock = stocks.find((s) => s.id === selectedId);
    if (targetStock) {
      onSelect(targetStock);
    }
  };

  return (
    <div className="relative w-full px-8">
      <select
        value={selectedStock.id}
        onChange={handleChange}
        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
      >
        {stocks.map((stock) => (
          <option key={stock.id} value={stock.id}>
            {stock.name}
          </option>
        ))}
      </select>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            className="h-[24px] w-[24px] rounded-full object-cover"
            src={selectedStock.logoUrl}
            alt={selectedStock.name}
          />
          <div className="text-[17px] font-semibold text-gray-900">
            {selectedStock.name}
          </div>
        </div>
        <img className="w-[15px]" src={SelectBtn} alt="종목 선택 화살표" />
      </div>
    </div>
  );
};

export default StockSelector;
