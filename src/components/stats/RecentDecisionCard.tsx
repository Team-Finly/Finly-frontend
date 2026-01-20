import { CARD_EMOTION_IMAGE, type EmotionType } from '@/enums/emotion';

export interface DecisionItem {
  stockName: string;
  emotion: string;
  tradeType: string;
  price: number;
  date: string;
  quantity: number;
  decisionResult: number;
}

interface Props {
  data: DecisionItem;
}

const RecentDecisionCard = ({ data }: Props) => {
  const { stockName, emotion, tradeType, price, date, decisionResult } = data;
  const emotionImg = CARD_EMOTION_IMAGE[emotion as EmotionType];

  // 날짜 처리
  const dateObj = new Date(date);
  const now = new Date();
  const formattedDate = `${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;
  const diffTime = now.getTime() - dateObj.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  let relativeTime = '';
  if (diffDays === 0) {
    relativeTime = '오늘';
  } else if (diffDays < 7) {
    relativeTime = `${diffDays}일 전`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    relativeTime = `${weeks}주 전`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    relativeTime = `${months}달 전`;
  } else {
    const years = Math.floor(diffDays / 365);
    relativeTime = `${years}년 전`;
  }

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
            {formattedDate} · {relativeTime}
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
