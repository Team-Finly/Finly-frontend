import React from 'react';
import Before from '@/assets/icons/before.svg';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
}

const TitleHeader = ({ title }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 z-1 w-full max-w-120 border-b border-gray-100 bg-white">
      <div className="relative mt-4 flex h-15 items-center justify-center bg-white px-4">
        <button
          className="absolute left-4 cursor-pointer"
          onClick={() => navigate(-1)}>
          <img className="h-4 w-2" src={Before} alt="이전" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      </div>
    </div>
  );
};

export default TitleHeader;
