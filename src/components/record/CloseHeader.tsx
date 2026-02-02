import React from 'react';
import Close from '../../assets/icons/close-dark.svg';

interface HeaderProps {
  title: string;
  border?: boolean;
  desc?: string;
  onClick: () => void;
}

const CloseHeader = ({ title, border = true, desc, onClick }: HeaderProps) => {
  return (
    <div
      className={`fixed top-0 z-1 w-full max-w-120 bg-white ${border ? 'border-b border-gray-100' : ''}`}
    >
      <div className="mt-4 flex h-15 w-full items-center justify-between bg-white px-4">
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        <button onClick={onClick}>
          <img className="h-4 w-4 cursor-pointer" src={Close} alt="이전" />
        </button>
      </div>
      {desc && (
        <p className="ml-4 text-sm font-semibold text-gray-300">{desc}</p>
      )}
    </div>
  );
};

export default CloseHeader;
