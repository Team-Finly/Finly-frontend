import React from 'react';

type Props = {
  score: number;
  color: string;
  size?: number;
};

const MindscoreCard = ({ score, color, size = 76 }: Props) => {
  // ----------------------------------------------------------------
  // [요청하신 원본 변수 및 로직 유지]
  // ----------------------------------------------------------------
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const clampedScore = Math.min(100, Math.max(0, score));
  const offset = circumference - (clampedScore / 100) * circumference;
  // ----------------------------------------------------------------

  return (
    
    <div className="flex w-full flex-1 flex-col items-center justify-center rounded-[12px] bg-white border border-gray-50">
      
      <h3 className="mb-[12px] mt-[24px] text-[14px] font-semibold text-gray-800">
        금융 마음 지수
      </h3>

      <div
        className="relative flex-shrink-0 flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 96 96" className="w-full h-full transform -rotate-290">
          <defs>
            <radialGradient
              id="inner-shadow"
              cx="50%"
              cy="50%"
              r="50%"
            >
              <stop
                offset="0%"
                stopColor="rgba(0,0,0,0.18)"
              />
              <stop
                offset="45%"
                stopColor="rgba(0,0,0,0.12)"
              />
              <stop
                offset="70%"
                stopColor="rgba(0,0,0,0)"
              />
            </radialGradient>
          </defs>

          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="#EEEFF0"
            strokeWidth="11"
            fill="none"
          />

          {/* 베이스 색 */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke={color}
            strokeWidth="11"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />

          {/* 안쪽 음영 */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="url(#inner-shadow)"
            strokeWidth="11"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>

        <span className="absolute text-gray-900 text-[18px] font-bold">
          {clampedScore}
          <span className="text-gray-900 font-medium text-[18px]">점</span>
        </span>
      </div>
      
      <span className="mt-[8px] mb-[25px] text-[12px] font-semibold text-gray-300">
        평균적 대응
      </span>

    </div>
  );
};

export default MindscoreCard;