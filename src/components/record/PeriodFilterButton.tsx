import React from 'react';

interface PeriodFilteringButtonProps {
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const PeriodFilterButton = ({
  label,
  isSelected,
  onClick,
}: PeriodFilteringButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-center rounded-full px-3.5 py-1.5 text-sm ${
        isSelected
          ? 'bg-secondary font-medium text-white'
          : 'bg-white font-normal text-gray-500 ring-1 ring-gray-100 ring-inset'
      } `}
    >
      <p>{label}</p>
    </button>
  );
};

export default PeriodFilterButton;
