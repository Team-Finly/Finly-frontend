import React from 'react';

interface ModalProps {
  text: string;
  desc: string;
  onClickLeft: () => void;
  onClickRight: () => void;
  onClose: () => void;
}

const Modal = ({
  text,
  desc,
  onClickLeft,
  onClickRight,
  onClose,
}: ModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div className="shadow-modal flex flex-col items-center rounded-[20px] bg-white px-4 py-5">
        <h4 className="mb-2 text-sm font-semibold text-gray-900">{text}</h4>
        <p className="mb-6 text-sm text-gray-700">{desc}</p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onClickLeft}
            className="h-9 w-27 cursor-pointer rounded-[10px] border border-gray-300 text-xs text-gray-300"
          >
            예
          </button>
          <button
            onClick={onClickRight}
            className="bg-secondary h-9 w-27 cursor-pointer rounded-[10px] text-xs text-white"
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
