import React from 'react'

interface ButtonProps {
  children: React.ReactNode; // 버튼 글씨 내용
  onClick?: () => void;      // 클릭 함수
  disabled?: boolean;        // 비활성화 여부
}
const Button = ({ children, onClick, disabled }: ButtonProps) => {
  
    return (

    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full h-[50px] rounded-xl font-semibold transition-colors text-[18px] leading-[26px]
        ${disabled 
          ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
          : 'bg-secondary text-white'
        }
      `}
    >
        
      {children}
    </button>

  )
}

export default Button
