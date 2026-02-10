import PatternBg from '@/assets/images/pattern_bg.png';
import { useAiAnalysis } from '@/hooks/useStatsAnalysis';
import { apiRenderGuard } from '@/utils/renderGuard';
import type { AiAnalysisResult } from '@/types/stats';

const RelationPattern = () => {
  const { data, isLoading, isError } = useAiAnalysis();

  const guardUI = apiRenderGuard(isLoading, isError, data);
  if (guardUI !== undefined) return guardUI;

  const { text } = data as AiAnalysisResult;

  return (
    <div
      className="flex w-full flex-col gap-4 rounded-[20px] px-5 py-5 shadow-sm"
      style={{
        backgroundImage: `url(${PatternBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="w-fit rounded-[20px] bg-gray-100 px-2 py-1 text-[13px] font-medium text-gray-500">
        투자 패턴 발견
      </div>
      <div className="text-[13px] leading-relaxed font-medium whitespace-pre-wrap text-gray-700">
        {text}
      </div>
    </div>
  );
};

export default RelationPattern;
