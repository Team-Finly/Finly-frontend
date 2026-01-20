import React from 'react';
import { EMOTIONS } from '../../constants/emtions';
import type { EmotionSummary } from './../../types/record';

interface LinearBarProps {
  emotions: EmotionSummary[];
}

const LinearBar = ({ emotions }: LinearBarProps) => {
  if (!emotions || emotions.length === 0) return null;
  const sortedEmotions = [...emotions].sort((a, b) => b.count - a.count);
  const maxEmotion = sortedEmotions[0];
  const minEmotion = sortedEmotions[sortedEmotions.length - 1];
  const maxLabel = EMOTIONS.find((e) => e.key === maxEmotion.emotion)?.label;
  const minLabel = EMOTIONS.find((e) => e.key === minEmotion.emotion)?.label;

  return (
    <div className="w-full">
      <div className="flex h-6 w-full gap-0.5 overflow-hidden rounded-full">
        {emotions.map((item) => {
          const emotion = EMOTIONS.find((e) => e.key === item.emotion);
          if (!emotion) return null;

          return (
            <div
              key={item.emotion}
              className={`${emotion.color} h-full transition-all duration-500`}
              style={{ width: `${item.ratio}%` }}
            />
          );
        })}
      </div>
      <div className="mt-2 mb-5.5 flex justify-between text-xs font-semibold text-gray-500/40">
        <p>{maxLabel}이 가장 선명해요</p>
        <p>{minLabel} 조각 감소 중</p>
      </div>
    </div>
  );
};

export default LinearBar;
