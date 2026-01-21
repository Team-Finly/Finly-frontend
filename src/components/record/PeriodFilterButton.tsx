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
          : 'font-regular border border-gray-100 bg-white text-gray-500'
      } `}
    >
      <p>{label}</p>
    </button>
  );
};

export default PeriodFilterButton;
