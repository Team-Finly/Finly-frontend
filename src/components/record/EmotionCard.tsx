import React from 'react';
import { EMOTIONS } from '../../constants/emtions';
import type { EmotionSummary } from '@/types/record';

interface EmotionCardProps {
  data: EmotionSummary;
  onClick: () => void;
}

const EmotionCard = ({ data, onClick }: EmotionCardProps) => {
  const emotion = EMOTIONS.find((e) => e.key === data.emotion);
  if (!emotion) return null;

  return (
    <div
      className="flex h-20 w-full cursor-pointer items-center gap-3.5 rounded-xl border border-gray-100 px-4"
      onClick={onClick}
    >
      <div
        className="flex h-10.5 w-10.5 items-center justify-center rounded-full"
        style={{ backgroundColor: emotion.bgColor }}
      >
        <img className="h-6 w-6" src={emotion.icon} alt={emotion.label} />
      </div>
      <div className="flex flex-1 items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-gray-900">{emotion.label}</p>
          <p className="text-gray-500/80">{data.ratio}%</p>
        </div>
        <div className="text-lg text-gray-900">{data.count}개</div>
      </div>
    </div>
  );
};

export default EmotionCard;
