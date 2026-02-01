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
  const [inputValue, setInputValue] = useState<string>(value?.toString() || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val.replace(/[^0-9]/g, ''));
    onChange(val);
  };

  return (
    <div className="flex flex-col border-b-[1.2px] border-gray-300">
      <h4 className="mb-2 text-xs font-semibold text-gray-300">{title}</h4>
      <div className="mb-[3px] flex items-center justify-end">
        <div className="flex w-full text-[13px] font-semibold text-gray-500">
          <input
            value={inputValue}
            onChange={handleChange}
            type="text"
            className="w-full text-right outline-none"
          />
          <p>{unit}</p>
        </div>
      </div>
    </div>
  );
};

export default TradeDetailInput;
