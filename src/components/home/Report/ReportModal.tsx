import React from 'react';
import LetterBox from '@/assets/icons/letterbox.svg';

interface ReportModalProps {
  name: string;
  isOpen: boolean;
  month?: string; 
  onConfirm: () => void;
  onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({
  name,
  isOpen,
  month ,
  onConfirm,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}/>

      <div
        className="relative rounded-2xl bg-white px-[16px] py-[20px] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-center text-[14px] font-semibold text-[#6E757DCC]">
          {month} 리포트
        </p>

        <h2 className="mt-[10px] text-center text-[17px] font-semibold leading-snug text-gray-900">
          {name}님, 지난 달
          <br />
          리포트가 도착했어요!
        </h2>

        <img
          src={LetterBox}
          className="mt-[30px] mb-[20px] w-[79px] h-[79px] items-center mx-auto"
        />

        <button
          onClick={onConfirm}
          className="h-[48px] px-[90px] py-[14px] rounded-xl bg-secondary text-[14px] font-semibold text-white active:scale-[0.98] cursor-pointer"
        >
          확인하기
        </button>
      </div>
    </div>
  );
};

export default ReportModal;