import { useState, type ChangeEvent } from "react";
import CloseIcon from "../../assets/images/close.png";
import styles from './TextField.module.css';
import Validicon from "../../assets/icons/isvalid.svg";


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

const TextField = ({ label, value, onChange, onClear, type = "text", placeholder, isValid, helperText, showValidIcon = true }: TextFieldProps) => {
  const isError = !!helperText || (isValid === false && value.length > 0);
  const isSuccess = value.length > 0 && isValid === true;
//테두리 색상 및 배경
let borderClass = "border-gray-300 bg-white";

// helperText가 있거나, focus 상태에서 helperText시 빨간 테두리
if (isError) {
  borderClass = "border-red-500 focus:border-red-500 bg-white";
} else if (isSuccess) {
  borderClass = "border-secondary focus:border-secondary bg-blue-bg";
} else if (value.length > 0) {
  borderClass = "border-secondary focus:border-secondary bg-white";
}

  // 아이콘
 const shouldShowValidIcon = showValidIcon && isSuccess;

  return (
    <div className="flex flex-col relative">
      <label className="text-[15px] font-semibold leading-none text-gray-500 mb-[10px]">
        {label}
      </label>
      <div className="relative w-full h-[50px] ">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`
            font-normal w-full h-full rounded-[12px] px-4 outline-none transition-colors duration-200
            border-[1.2px] 
            ${borderClass}
            text-[17px]
            font-normal
            text-gray-900
            placeholder-gray-300
            placeholder:text-regular
            ${type === 'password' ? styles['hide-password-eye'] : ''}
          `}
        />
       
        {shouldShowValidIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
            <img
              src={Validicon}
              alt="유효함"
              className="w-5 h-5"
            />
          </span>
        )}

        {value.length > 0 && !shouldShowValidIcon && !isValid &&(
          <button 
            type="button"
            onClick={onClear} 
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer"
          >
            <img 
              src={CloseIcon} 
              alt="X아이콘"
              className="w-5 h-5"
            />
          </button>
        )}
      </div>
      {helperText && (
        <p className="mt-[8px] text-xs text-red-500">{helperText}</p>
      )}
    </div>
  );
};

export default TextField;