import { useMemo } from 'react';
import { EMOTION_CHART_MAP } from '@/constants/emotions';
import { formatTime } from '@/utils/date';

interface AnalysisCardProps {
  data: any;
}

const AnalysisCard = ({ data }: AnalysisCardProps) => {
  const emotionData = useMemo(() => {
    if (!data?.record?.emotion) return null;
    return EMOTION_CHART_MAP[data.record.emotion];
  }, [data?.record?.emotion]);

  if (!data || !data.record) {
    return <div className="h-[200px]" />;
  }

  const { record } = data;

  if (!emotionData) {
    console.log('emotionData 없음:', record.emotion);
    return null;
  }

  return (
    <div key={record.recordId} className="flex w-full flex-col px-4 pt-7">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-2">
          <div className="text-[18px] font-semibold text-gray-900">
            {emotionData.label} 조각
          </div>
          <div
            className="flex items-center justify-center rounded-sm px-1 py-0.5 text-[11px]"
            style={{
              backgroundColor: emotionData.bgColor,
              color: emotionData.color,
            }}
          >
            Lv. {record.emotionIntensity}
          </div>
        </div>
        <div className="text-[18px] font-semibold text-gray-900">
          {record.tradeAction === 'HOLD' ? (
            '관망 중'
          ) : (
            <>{record.totalPrice?.toLocaleString()}원</>
          )}
        </div>
      </div>
      <div className="mt-1 mb-2 flex flex-row justify-end text-[12px] font-semibold text-gray-300">
        {record.tradeAction === 'HOLD' ? (
          '\u00A0'
        ) : (
          <>
            {record.quantity}주 {record.tradeAction === 'BUY' ? '매수' : '매도'}{' '}
            · 1주 당 {record.pricePerShare?.toLocaleString()}원
          </>
        )}
      </div>
      <div className="mb-2 text-[12px] font-semibold text-gray-300">
        {formatTime(record.recordedAt)}
      </div>
      <div className="rounded-[12px] border-[1.2px] border-gray-100 bg-gray-50/60 p-3.5 text-[14px] leading-[1.6] text-gray-700">
        “{record.memo}”
      </div>
    </div>
  );
};

export default AnalysisCard;
