import { SCORE_CONFIG } from '@/constants/mindScore.ts';
import CircularScore from '@/components/home/MindScore/CircularScore.tsx';

export const MindScore = ({ score = 80 }) => {
  const config = SCORE_CONFIG.find(c => score >= c.min && score <= c.max) || SCORE_CONFIG[1];

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
        
        <CircularScore score={score} color={config.color} />
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
