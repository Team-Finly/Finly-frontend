import { SCORE_CONFIG } from '@/constants/mindScore.ts';
import CircularScore from '@/components/home/MindScore/CircularScore.tsx';
import HighlightText from '@/components/home/MindScore/HighlightText';
import { type MindScoreResponse } from '@/types/mindScore'

interface mindScoreProps {
  mindScore?: MindScoreResponse;
}

export const MindScore = ({ mindScore }: mindScoreProps) => {
  if (!mindScore) return null;

  const { fmiComment, fmiLevel, fmiScore, memberName, persona } = mindScore;
  const personaTitle = persona?.personaTitle ?? '';

  const config =
    SCORE_CONFIG.find((c) => fmiScore >= c.min && fmiScore <= c.max) ||
    SCORE_CONFIG[1];

  return (
    <div>
      <section className="flex items-center justify-between rounded-xl bg-white px-[12px] py-[27px] shadow-sm shadow-[#DFE2E81A]">
        <div>
          <p className="text-[12px] text-[#4E5660CC]">{personaTitle}</p>
          <h2 className="mb-[20px] text-[20px] font-semibold">
            <span className="text-secondary font-bold">{memberName}</span>님의 금융 마음
            지수
          </h2>

          <span className="rounded-full bg-gray-100 px-[10px] py-[4px] text-[14px] font-semibold text-gray-500">
            {fmiLevel}
          </span>

          <HighlightText
            text={fmiComment}
            highlight={config.highlight}
            className="mt-[10px] text-[13px] text-gray-700"
          />
        </div>

        <CircularScore score={fmiScore} color={config.color} />
      </section>
    </div>
  );
};
