import { SCORE_CONFIG } from '@/constants/mindScore.ts';
import CircularScore from '@/components/home/MindScore/CircularScore.tsx';
import HighlightText from '@/components/home/MindScore/HighlightText';

export const MindScore = ({ score = 80 }) => {
  const config =
    SCORE_CONFIG.find((c) => score >= c.min && score <= c.max) ||
    SCORE_CONFIG[1];

  return (
    <div>
      <section className="flex items-center justify-between rounded-xl bg-white px-[12px] py-[27px] shadow-sm shadow-[#DFE2E81A]">
        <div>
          <p className="text-[12px] text-[#4E5660CC]">{config.title}</p>
          <h2 className="mb-[20px] text-[20px] font-semibold">
            <span className="text-secondary font-bold">키르</span>님의 금융 마음
            지수
          </h2>

          <span className="rounded-full bg-gray-100 px-[10px] py-[4px] text-[14px] font-semibold text-gray-500">
            {config.label}
          </span>

          <HighlightText
            text={config.desc}
            highlight={config.highlight}
            className="mt-[10px] text-[13px] text-gray-700"
          />
        </div>

        <CircularScore score={score} color={config.color} />
      </section>

      <div className="mt-[12px] flex justify-end">
        <button
          type="button"
          onClick={() => {}}
          className="text-[12px] text-gray-500 underline underline-offset-2 transition-colors"
        >
          금융 마음 지수란?
        </button>
      </div>
    </div>
  );
};
