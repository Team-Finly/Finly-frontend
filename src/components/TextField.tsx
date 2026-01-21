// src/components/TextField.tsx
import { type ChangeEvent } from "react";
import CloseIcon from "../assets/icons/Union.png";
import styles from './TextField.module.css'; //눈아이콘 숨기기

// 부모(LoginPage)에서 받아와야 할 데이터들(Props) 정의
interface TextFieldProps {
  label: string;          // "이메일" or "비밀번호"
  value: string;          // 상태 값 (email, password)
  onChange: (e: ChangeEvent<HTMLInputElement>) => void; // 입력 함수
  onClear: () => void;    // 초기화 함수
  type?: string;          // "text", "password", "email" 등 (선택사항)
  placeholder?: string;   // 안내 문구
  isValid?: boolean;      // 유효성 prop 추가
}

const TextField = ({ label, value, onChange, onClear, type = "text", placeholder, isValid }: TextFieldProps) => {
  return (
    <div className="flex flex-col gap-[10px] relative">
      <label className="text-base font-medium leading-none text-gray-500">
        {label}
      </label>
      
      <div className="relative w-full h-[50px]">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`
            font-normal w-full h-full rounded-[12px] px-4 outline-none transition-colors duration-200
            border-[1.2px] 
            ${isValid
              ? 'border-secondary bg-blue-bg'   // 유효할 때: 파란 테두리, 연한 파란 배경
              : value.length > 0 
                ? "border-secondary bg-white"  // 1. 글자가 있을 때: 파란 테두리
                : "border-gray-300 bg-white"   // 2. 글자가 없을 때: 회색 테두리
            }
            focus:border-secondary         // 3. (옵션) 클릭했을 때도 파란색 유지
            text-[17px]
            font-normal
            text-gray-900
            placeholder-gray-300 
            ${type === 'password' ? styles['hide-password-eye'] : ''}  //눈아이콘 숨기기
          
          
            `}
        />
        
        {/* 값이 있을 때만 X 버튼 표시 */}
        {value.length > 0 && (
          <button onClick={onClear} type="button" className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
        
        <img 
          src={CloseIcon}      // 아까 import한 변수 이름
          alt="닫기 아이콘"     // 시각장애인용 설명 (필수)
          className="w-5 h-5"  // Tailwind로 크기 조절 (20px)
        />
        
      </button>
        )}
      </div>
    </div>
  );
};

export default TextField;