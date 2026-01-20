import React from 'react';
import PlusWhite from '../../assets/icons/plus-white.svg';

const FloatingButton = () => {
  return (
    <button className="bg-secondary fixed top-160 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full">
      <img src={PlusWhite} alt="기록하기 버튼" />
    </button>
  );
};

export default FloatingButton;
