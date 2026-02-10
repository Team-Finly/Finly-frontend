import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({ text, onClick, disabled }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`h-[50px] w-full rounded-xl text-[18px] ${
        disabled
          ? 'cursor-not-allowed bg-gray-100 font-semibold text-gray-300'
          : 'bg-secondary cursor-pointer font-bold text-white'
      } `}
    >
      {text}
    </button>
  );
};

export default Button;
