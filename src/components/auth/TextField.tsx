import { useState, type ChangeEvent } from 'react';
import CloseIcon from '@/assets/images/close.png';
import styles from '@/components/auth/TextField.module.css';
import Validicon from '@/assets/icons/isvalid.svg';

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  type?: string;
  placeholder?: string;
  isValid?: boolean;
  helperText?: string;
  showValidIcon?: boolean;
}

const TextField = ({
  label,
  value,
  onChange,
  onClear,
  type = 'text',
  placeholder,
  isValid,
  helperText,
  showValidIcon = true,
}: TextFieldProps) => {
  const isError = !!helperText || (isValid === false && value.length > 0);
  const isSuccess = value.length > 0 && isValid === true;
  //테두리 색상 및 배경
  let borderClass = 'border-gray-300 bg-white';

  // helperText가 있거나, focus 상태에서 helperText시 빨간 테두리
  if (isError) {
    borderClass = 'border-red-500 focus:border-red-500 bg-white';
  } else if (isSuccess) {
    borderClass = 'border-secondary focus:border-secondary bg-blue-bg';
  } else if (value.length > 0) {
    borderClass = 'border-secondary focus:border-secondary bg-white';
  }

  // 아이콘
  const shouldShowValidIcon = showValidIcon && isSuccess;

  return (
    <div className="relative flex flex-col">
      <label className="mb-[10px] text-[15px] leading-none font-semibold text-gray-500">
        {label}
      </label>
      <div className="relative h-[50px] w-full">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`h-full w-full rounded-[12px] border-[1.2px] px-4 font-normal transition-colors duration-200 outline-none ${borderClass} placeholder:text-regular text-[17px] font-normal text-gray-900 placeholder-gray-300 ${type === 'password' ? styles['hide-password-eye'] : ''} `}
        />

        {shouldShowValidIcon && (
          <span className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center justify-center">
            <img src={Validicon} alt="유효함" className="h-5 w-5" />
          </span>
        )}

        {value.length > 0 && !shouldShowValidIcon && !isValid && (
          <button
            type="button"
            onClick={onClear}
            className="absolute top-1/2 right-3 flex -translate-y-1/2 cursor-pointer items-center justify-center"
          >
            <img src={CloseIcon} alt="X아이콘" className="h-5 w-5" />
          </button>
        )}
      </div>
      {helperText && (
        <p className="absolute bottom-[-22px] text-xs text-red-500">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default TextField;
