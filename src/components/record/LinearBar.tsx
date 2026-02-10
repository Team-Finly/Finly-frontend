import React from 'react';
import { EMOTIONS } from '@/constants/emotions';
import type { FragmentSummaryResponse } from '@/types/record';
import { useNavigate } from 'react-router-dom';
import { hasBatchim } from '@/utils/checkBatchim';
import { EMOTION_CHART_MAP } from '@/constants/emotions';

interface LinearBarProps {
  fragmentSummary: FragmentSummaryResponse | null;
}

const LinearBar = ({ fragmentSummary }: LinearBarProps) => {
  const navigate = useNavigate();
  console.log('fragmentSummary', fragmentSummary);

  if (!fragmentSummary) {
    return null;
  }

  const dominantLabel =
    EMOTION_CHART_MAP[fragmentSummary.dominantType]?.label || '';
  const recessiveLabel =
    EMOTION_CHART_MAP[fragmentSummary.recessiveType]?.label || '';

  return (
    <div className="w-full">
      {fragmentSummary.typeSummary.length === 0 ? (
        <div
          className="h-6 w-full cursor-pointer overflow-hidden rounded-full bg-gray-200"
          onClick={() => navigate('/fragment')}
        ></div>
      ) : (
        <div
          className="flex h-6 w-full cursor-pointer gap-0.5 overflow-hidden rounded-full"
          onClick={() => navigate('/fragment')}
        >
          {fragmentSummary.typeSummary.map((item) => {
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
        {fragmentSummary.typeSummary.length === 0 ? (
          <p>첫 조각을 남겨주세요!</p>
        ) : (
          <>
            {dominantLabel && (
              <p>
                {dominantLabel}
                {hasBatchim(dominantLabel) ? '이' : '가'} 가장 선명해요
              </p>
            )}
            {fragmentSummary.typeSummary.length !== 1 && recessiveLabel && (
              <p>{recessiveLabel} 조각 감소 중</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LinearBar;
