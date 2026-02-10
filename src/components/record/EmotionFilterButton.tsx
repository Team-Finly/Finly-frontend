import React from 'react';

interface EmotionFilterButtonProps {
  icon?: string;
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
  px?: number;
}

const EmotionFilterButton = ({
  icon,
  label,
  isSelected,
  onClick,
  px,
}: EmotionFilterButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex h-8.5 shrink-0 cursor-pointer items-center justify-center gap-1 rounded-full px-3 text-[13px] ${
        isSelected
          ? 'bg-secondary shadow-card2 font-medium text-white'
          : 'bg-gray-50/80 font-normal text-gray-500 ring-1 ring-gray-100 ring-inset'
      }`}
      style={px ? { paddingLeft: `${px}px`, paddingRight: `${px}px` } : {}}
    >
      {icon && (
        <img
          src={icon}
          alt={`${label} 아이콘`}
          className="h-3.75 w-3.75 object-contain"
        />
      )}
      <p className="whitespace-nowrap">{label}</p>
    </button>
  );
};

export default EmotionFilterButton;
