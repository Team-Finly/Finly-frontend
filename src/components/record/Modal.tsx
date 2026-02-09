import React from 'react';

interface ModalProps {
  text: string;
  desc: string;
  onClickLeft: () => void;
  onClickRight: () => void;
  onClose: () => void;
  rightBtnClassName?: string;
  rightBtnLabel?: string;
  leftBtnLabel?: string;
}

const Modal = ({
  text,
  desc,
  onClickLeft,
  onClickRight,
  onClose,
  rightBtnClassName,
  rightBtnLabel,
  leftBtnLabel,
}: ModalProps) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
    >
      <div
        className="shadow-modal flex flex-col items-center rounded-[20px] bg-white px-4 py-5"
        onClick={(e) => e.stopPropagation()}
      >
        <h4 className="mb-2 text-sm font-semibold text-gray-900">{text}</h4>
        <p className="mb-6 text-sm text-gray-700 whitespace-pre-line text-center">{desc}</p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onClickLeft}
            className="h-9 w-27 cursor-pointer rounded-[10px] border border-gray-300 text-xs text-gray-300"
          >
            {leftBtnLabel || "예"}
          </button>
          <button
            onClick={onClickRight}
            className={`h-9 w-27 cursor-pointer rounded-[10px] text-xs 
            ${rightBtnClassName || 'bg-secondary text-white'}`}
          >
            {rightBtnLabel || "아니오"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
