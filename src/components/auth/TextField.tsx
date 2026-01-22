import { useState, type ChangeEvent } from "react";
import CloseIcon from "../../assets/images/close.png";
import styles from './TextField.module.css';
import Validicon from "../../assets/icons/isvalid.svg";


interface TextFieldProps {
  label: string;          // "이메일" or "비밀번호"
  value: string;          // 상태 값 (email, password)
  onChange: (e: ChangeEvent<HTMLInputElement>) => void; // 입력 함수
  onClear: () => void;    // 초기화 함수
  type?: string;          // "text", "password", "email" 등 (선택사항)
  placeholder?: string;   // 안내 문구
  isValid?: boolean;  
  helperText?: string; 
  
}

const TextField = ({ label, value, onChange, onClear, type = "text", placeholder, isValid, helperText }: TextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  
  // 조건에 따라 테두리 색상 및 배경
let borderClass = "border-gray-300 bg-white";
// helperText가 있거나, focus 상태에서 helperText가 있으면 무조건 빨간 테두리
if ((helperText && isFocused) || helperText) {
  borderClass = "border-red-500 bg-white";
} else if (isValid === false && value.length > 0) {
  borderClass = "border-red-500 bg-white";
} else if (isValid === true && value.length > 0) {
  borderClass = "border-secondary bg-blue-bg";
} else if (value.length > 0) {
  borderClass = "border-secondary bg-white";
}

  // 아이콘 조건: 유효성 체크가 false면 isvalid, true면 isvalid, undefined면 X
 let currentIcon = CloseIcon;
  let isCheckIcon = false; // 현재 아이콘이 체크인지 X인지 구분


  
  // 조건: "값이 있고" && "유효하며(true)" && "입력을 마쳤을 때(Focus 아님)"
  if (value.length > 0 && isValid === true && !isFocused) {
    currentIcon = Validicon;
    
  }

  return (
    <div className="flex flex-col relative">
      <label className="text-[15px] font-semibold leading-none text-gray-500 mb-[10px]">
        {label}
      </label>
      <div className="relative w-full h-[50px]">
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
            // ✅ 5. 체크 아이콘일 때는 클릭해도 지워지지 않게 막음 (선택사항)
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