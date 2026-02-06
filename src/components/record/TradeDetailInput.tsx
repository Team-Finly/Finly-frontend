import React, { useState } from 'react';

interface TradeDetailInputProps {
  title: string;
  value?: number;
  unit: string;
  onChange: (val: string) => void;
}

const TradeDetailInput = ({
  title,
  value,
  unit,
  onChange,
}: TradeDetailInputProps) => {
  const formatNumber = (num: number | string) => {
    const value = num.toString().replace(/[^0-9]/g, '');
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const [displayValue, setDisplayValue] = useState<string>(
    value ? formatNumber(value) : '',
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setDisplayValue(formatNumber(val));
    onChange(val);
  };

  return (
    <div className="flex flex-col border-b-[1.2px] border-gray-300">
      <h4 className="mb-2 text-xs font-semibold text-gray-300">{title}</h4>
      <div className="mb-[3px] flex items-center justify-end">
        <div className="flex w-full text-[13px] font-semibold text-gray-500">
          <input
            value={displayValue}
            onChange={handleChange}
            type="text"
            inputMode="numeric"
            className="w-full text-right outline-none"
          />
          <p>{unit}</p>
        </div>
      </div>
    </div>
  );
};

export default TradeDetailInput;
