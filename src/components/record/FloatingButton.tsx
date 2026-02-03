import React from 'react';
import PlusWhite from '@/assets/icons/plus-white.svg';
import { useNavigate } from 'react-router-dom';

const FloatingButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="bg-secondary absolute right-4 bottom-[107px] z-100 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full"
      onClick={() => navigate('/record/create')}
    >
      <img src={PlusWhite} alt="기록하기 버튼" />
    </button>
  );
};

export default FloatingButton;
