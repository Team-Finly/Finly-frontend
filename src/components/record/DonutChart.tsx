import React from 'react';
import { EMOTIONS } from '@/constants/emotions';
import { useFragmentSummary } from '@/hooks/useFragmentSummary';

const DonutChart = () => {
  const { data: fragmentSummary } = useFragmentSummary();

  const size = 120;
  const strokeWidth = 14;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let currentOffset = 0;

  return (
    <div className="relative flex h-30 w-30 items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="#EEEEF0"
          strokeWidth={strokeWidth}
        />
        {fragmentSummary?.typeSummary.map((item) => {
          const emotionInfo = EMOTIONS.find((e) => e.key === item.type);
          const strokeDasharray = `${(item.percent / 100) * circumference} ${circumference}`;
          const strokeDashoffset = -currentOffset;

          currentOffset += (item.percent / 100) * circumference;

          return (
            <circle
              key={item.type}
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke={emotionInfo?.color || '#F4F5F7'}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="butt"
              className="transition-all duration-500"
            />
          );
        })}
      </svg>
      <span className="absolute text-[30px] font-bold text-gray-900">
        {fragmentSummary?.totalCount}
      </span>
    </div>
  );
};

export default DonutChart;
