import React from 'react';
import { EMOTIONS } from '@/constants/emotions';
import type { EmotionSummary, FragmentSummary } from '@/types/record';
import { useNavigate } from 'react-router-dom';

interface LinearBarProps {
  emotions: EmotionSummary[];
  fragmentSummary: FragmentSummary;
}

const LinearBar = ({ emotions, fragmentSummary }: LinearBarProps) => {
  const navigate = useNavigate();

  if (!emotions || emotions.length === 0) return null;
  const sortedEmotions = [...emotions].sort((a, b) => b.count - a.count);
  const maxEmotion = sortedEmotions[0];
  const minEmotion = sortedEmotions[sortedEmotions.length - 1];
  const maxLabel = EMOTIONS.find((e) => e.key === maxEmotion.emotion)?.label;
  const minLabel = EMOTIONS.find((e) => e.key === minEmotion.emotion)?.label;

  return (
    <div className="w-full">
      <div
        className="flex h-6 w-full cursor-pointer gap-0.5 overflow-hidden rounded-full"
        onClick={() => navigate('/fragment', { state: { fragmentSummary } })}
      >
        {emotions.map((item) => {
          const emotion = EMOTIONS.find((e) => e.key === item.emotion);
          if (!emotion) return null;

          return (
            <div
              key={item.emotion}
              className="h-full transition-all duration-500"
              style={{
                width: `${item.ratio}%`,
                backgroundColor: emotion.color,
              }}
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
