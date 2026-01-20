import React from 'react';
import Message from '../../assets/icons/message.svg';

const EmptyFragment = () => {
  return (
    <div className="flex h-21.5 w-full flex-col items-center justify-center gap-3 rounded-xl">
      <img src={Message} alt="메시지 아이콘" />
      <p className="text-sm text-gray-300">기록된 조각이 없어요</p>
    </div>
  );
};

export default EmptyFragment;
