import React from 'react';
import { EMOTIONS } from '@/constants/emotions'; // 정의하신 상수 사용

interface DonutChartProps {
  totalCount: number;
  data: { emotion: string; ratio: number }[];
}

const DonutChart = ({ totalCount, data }: DonutChartProps) => {
  const size = 120; // h-30, w-30 (120px)
  const strokeWidth = 14;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let currentOffset = 0;

  return (
    <div className="relative flex h-30 w-30 items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        {data.map((item) => {
          const emotionInfo = EMOTIONS.find((e) => e.key === item.emotion);
          const strokeDasharray = `${(item.ratio / 100) * circumference} ${circumference}`;
          const strokeDashoffset = -currentOffset;

          currentOffset += (item.ratio / 100) * circumference;

          return (
            <circle
              key={item.emotion}
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
        {totalCount}
      </span>
    </div>
  );
};

export default DonutChart;
