import React from 'react';
import { EMOTIONS } from '@/constants/emotions';
import type { TypeSummary } from '@/types/record';
import { useNavigate } from 'react-router-dom';
import { hasBatchim } from '@/utils/checkBatchim';

interface LinearBarProps {
  emotions: TypeSummary[];
}

const LinearBar = ({ emotions }: LinearBarProps) => {
  const navigate = useNavigate();

  if (!emotions) return null;
  let maxLabel = '';
  let minLabel = '';

  if (emotions.length > 0) {
    const sortedEmotions = [...emotions].sort((a, b) => b.count - a.count);
    const maxEmotion = sortedEmotions[0];
    const minEmotion = sortedEmotions[sortedEmotions.length - 1];
    maxLabel = EMOTIONS.find((e) => e.key === maxEmotion?.type)?.label || '';
    minLabel = EMOTIONS.find((e) => e.key === minEmotion?.type)?.label || '';
  }

  return (
    <div className="w-full">
      {emotions.length === 0 ? (
        <div className="h-6 w-full cursor-pointer overflow-hidden rounded-full bg-gray-200"></div>
      ) : (
        <div
          className="flex h-6 w-full cursor-pointer gap-0.5 overflow-hidden rounded-full"
          onClick={() =>
            navigate('/fragment', { state: { typeSummary: emotions } })
          }
        >
          {emotions.map((item) => {
            const emotion = EMOTIONS.find((e) => e.key === item.type);
            if (!emotion) return null;

            return (
              <div
                key={item.type}
                className="h-full transition-all duration-500"
                style={{
                  width: `${item.percent}%`,
                  backgroundColor: emotion.color,
                }}
              />
            );
          })}
        </div>
      )}
      <div className="mt-2 mb-5.5 flex justify-between text-xs font-semibold text-gray-500/40">
        {emotions.length === 0 ? (
          <p>첫 조각을 남겨주세요!</p>
        ) : (
          <>
            <p>
              {maxLabel}
              {hasBatchim(maxLabel) ? '이' : '가'} 가장 선명해요
            </p>
            <p>{minLabel} 조각 감소 중</p>
          </>
        )}
      </div>
    </div>
  );
};

export default LinearBar;
