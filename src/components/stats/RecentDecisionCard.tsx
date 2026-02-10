import { EMOTION_CHART_MAP } from '@/constants/emotions';
import type { DecisionItem } from '@/types/stats';
import { formatDateDisplay } from '@/utils/date';

interface Props {
  data: DecisionItem;
}

const RecentDecisionCard = ({ data }: Props) => {
  const {
    stockName,
    emotion,
    tradeType,
    price,
    date,
    decisionResult,
    quantity,
  } = data;
  const emotionConfig = EMOTION_CHART_MAP[emotion];
  const emotionImg = emotionConfig?.cardImage;
  const formattedDate = formatDateDisplay(date);

  // 수익률 처리
  const isPositive = decisionResult > 0;
  const resultColor = isPositive ? 'text-stock-buy' : 'text-stock-sell';
  const resultSign = isPositive ? '+' : '';

  return (
    <div className="flex flex-row gap-5 rounded-[12px] border-[1.2px] border-gray-100 bg-white px-4 py-5">
      {emotionImg && (
        <img src={emotionImg} alt={emotion} className="h-[50px] w-[50px]" />
      )}

      <div className="flex w-full flex-col justify-between py-0.5">
        <div className="flex flex-row items-center justify-between">
          <div className="text-[15px] font-semibold text-gray-900">
            {stockName}
            <span className="ml-1 rounded-[12px] bg-gray-50 px-2.5 py-1 text-[12px] font-medium text-gray-700">
              {tradeType}
            </span>
          </div>
          <div className="text-[18px] font-semibold text-gray-900">
            {price.toLocaleString()}원
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="text-[12px] font-medium text-gray-300">
            {formattedDate} · {quantity}주
          </div>
          <div className={`text-[16px] font-medium ${resultColor}`}>
            {resultSign}
            {decisionResult}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentDecisionCard;
