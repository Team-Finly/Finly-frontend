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
  
}

const TextField = ({ label, value, onChange, onClear, type = "text", placeholder, isValid, helperText }: TextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  
//테두리 색상 및 배경
let borderClass = "border-gray-300 bg-white";

// helperText가 있거나, focus 상태에서 helperText시 빨간 테두리
if ((helperText && isFocused) || helperText) {
  borderClass = "border-red-500 bg-white";
} else if (isValid === false && value.length > 0) {
  borderClass = "border-red-500 bg-white";
} else if (isValid === true && value.length > 0) {
  borderClass = "border-secondary bg-blue-bg";
} else if (value.length > 0) {
  borderClass = "border-secondary bg-white";
}

  // 아이콘
 let currentIcon = CloseIcon;
 let isCheckIcon = false; 

  if (value.length > 0 && isValid === true && !isFocused) {
    currentIcon = Validicon;
    
  }

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

          onFocus={() => setIsFocused(true)}  // 클릭해서 입력 시작하면 true
          onBlur={() => setIsFocused(false)}  // 다른 곳 눌러서 입력 끝나면 false

          className={`
            font-normal w-full h-full rounded-[12px] px-4 outline-none transition-colors duration-200
            border-[1.2px] 
            ${borderClass}
            ${!helperText ? "focus:border-secondary" : ""}
            text-[17px]
            font-normal
            text-gray-900
            placeholder-gray-300
            placeholder:text-regular
            ${type === 'password' ? styles['hide-password-eye'] : ''}
          `}
        />
        {/* 값이 있을 때만 아이콘 표시 */}
        {value.length > 0 && (
          <button 
            type="button"
            // X 아이콘일 때만 onClear 실행
            onClick={isCheckIcon ? undefined : onClear} 
            className={`absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center 
              ${isCheckIcon ? "cursor-default" : "cursor-pointer"}`}
          >
            <img 
              src={currentIcon} 
              alt={isCheckIcon ? "유효함" : "지우기"}
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