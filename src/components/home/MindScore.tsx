import { SCORE_CONFIG } from '@/constants/mindScore.ts';

export const MindScore = ({ score = 80 }) => {
  const config = SCORE_CONFIG.find(c => score >= c.min && score <= c.max) || SCORE_CONFIG[1];

  // SVG 프로그레스 계산
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const renderDesc = () => {
    const parts = config.desc.split(config.highlight);
    return (
      <p className="text-[13px] text-gray-700 mt-[10px]">
        {parts[0]}
        <span className="font-bold">{config.highlight}</span>
        {parts[1]}
      </p>
    );
  };
  
  return (
    <div>
      <section className="px-[12px] py-[27px] bg-white rounded-xl shadow-[#DFE2E81A] shadow-sm flex justify-between items-center">
        <div>
          <p className="text-[12px] text-[#4E5660CC]">{config.title}</p>
          <h2 className="text-[20px] font-semibold mb-[20px]">
            <span className="text-secondary font-bold">키르</span>님의 금융 마음 지수
          </h2>
          
          <span className="bg-gray-100 px-[10px] py-[4px] rounded-full text-[14px] text-gray-500 font-semibold">
            {config.label}
          </span>
          {renderDesc()}
        </div>
        
        {/* 원형 프로그레스 바 */}
        <div className="relative w-[94px] h-[94px] flex-shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-270">
            <circle cx="48" cy="48" r={radius} stroke="#EEEFF0" strokeWidth="11" fill="transparent" />
            <circle 
              cx="48" cy="48" r={radius} 
              stroke={config.color} 
              strokeWidth="11" fill="transparent"
              strokeDasharray={circumference} 
              strokeDashoffset={offset} 
              strokeLinecap="round" 
              className="transition-all duration-500 ease-out"
            />
          </svg>
          <span className="absolute text-gray-900 text-[26px] font-semibold">
            {score}<span className="text-gray-500 text-[14px]">점</span>
          </span>
        </div>
      </section>

      <div className="flex justify-end mt-[12px]">
        <button
          type="button"
          onClick={() => { }}
          className="text-[12px] text-gray-500 underline underline-offset-2 transition-colors"
        >
          금융 마음 지수란?
        </button>
      </div>
    </div>
  )
};
