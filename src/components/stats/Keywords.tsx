import { useStatsStore } from '@/store/statsStockStore';
import { useShakenKeywords } from '@/hooks/useEmotionTab';
import { apiRenderGuard } from '@/utils/renderGuard';
import type { StockKeywordsResult } from '@/types/stats';
import { UniversalSkeleton } from '@/components/UniversalSkeleton';

const KeywordsSkeleton = () => (
  <div className="rounded-[8px] border-[1.2px] border-gray-100 bg-white p-5">
    <UniversalSkeleton className="mb-1 h-[24px] w-[120px] rounded-md bg-gray-50" />
    <UniversalSkeleton className="mb-6 h-[18px] w-[180px] rounded-md bg-gray-50" />
    <UniversalSkeleton className="h-[70px] w-full rounded-[10px]" />
  </div>
);

const Keywords = () => {
  const { currentStock } = useStatsStore();
  const { data, isLoading, isError } = useShakenKeywords(currentStock?.symbol);

  const guardUI = apiRenderGuard(
    isLoading,
    isError,
    data,
    <KeywordsSkeleton />,
  );
  if (guardUI !== undefined) return guardUI;

  const keywordData = data as StockKeywordsResult;

  // 상위 키워드 자리 고정
  const reorderedKeywords = (() => {
    const rawKeywords = keywordData.keywords.map((k) => `#${k.keyword}`);
    const top3 = rawKeywords.slice(0, 3);
    const others = rawKeywords.slice(3, 8);

    const result = new Array(8).fill('');

    if (top3[0]) result[2] = top3[0];
    if (top3[1]) result[4] = top3[1];
    if (top3[2]) result[6] = top3[2];

    let otherIdx = 0;
    for (let i = 0; i < 8; i++) {
      if (!result[i]) {
        result[i] = others[otherIdx++] || '';
      }
    }
    return result;
  })();

  const row1 = reorderedKeywords.slice(0, 4);
  const row2 = reorderedKeywords.slice(4, 8);
  const baseStyle =
    'flex items-center justify-center rounded-[16px] text-[13px] font-medium px-2 py-1';
  const blueStyle = 'bg-blue-bg/50 text-secondary font-semibold';
  const grayStyle = 'bg-gray-50 text-gray-500 font-medium';

  return (
    <div className="rounded-xl border-[1.2px] border-gray-100 bg-white p-5">
      <div className="mb-1 text-[16px] font-semibold text-gray-700">
        나를 흔든 키워드
      </div>
      <div className="mb-6 text-[12px] font-medium text-gray-300">
        메모에 가장 많이 쓴 단어들이에요
      </div>
      <div className="flex flex-col gap-4 px-1">
        <div className="flex flex-row justify-start gap-2">
          {row1.map((keyword, i) => {
            if (!keyword) return null;
            const isTop1 = i === 2;
            return (
              <div
                key={`row1-${i}`}
                className={`${baseStyle} ${isTop1 ? blueStyle : grayStyle}`}
              >
                {keyword}
              </div>
            );
          })}
        </div>
        <div className="flex flex-row justify-start gap-2">
          {row2.map((keyword, i) => {
            if (!keyword) return null;
            const isTop2or3 = i === 0 || i === 2;
            return (
              <div
                key={`row2-${i}`}
                className={`${baseStyle} ${isTop2or3 ? blueStyle : grayStyle}`}
              >
                {keyword}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Keywords;
