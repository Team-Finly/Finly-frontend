import { EMOTION_CHART_MAP } from '@/constants/emotions';
import type { HomeRecordItem, TradeActionType } from '@/types/record';
import type { StockInfo } from '@/types/stock';
import { formatMonthDay } from '@/utils/date';

interface Props {
  record: HomeRecordItem;
  stock?: StockInfo;
}

const TRADE_ACTION_LABEL_MAP: Record<TradeActionType, string> = {
  BUY: '매수',
  SELL: '매도',
  WATCH: '관망',
};

export const RecentRecordCard = ({ record, stock }: Props) => {
  const emotion = EMOTION_CHART_MAP[record.emotionCode];

  return (
    <div className="min-w-[256px] rounded-xl border border-[#F2F4F6] bg-white p-[12px] shadow-sm shadow-[#DFE2E81A]">
      <p className="pb-[6px] text-[12px] text-[#4E566066]">
        {formatMonthDay(record.recordDate)}
      </p>

      <div className="flex items-center">
        <div className="mb-[10px] flex items-center gap-2">
          {stock?.logoUrl ? (
            <img
              src={stock.logoUrl}
              alt={stock.name}
              className="h-5 w-5 rounded-full object-cover"
            />
          ) : (
            <div className="h-5 w-5 rounded bg-gray-200" />
          )}
          <span className="text-[15px] font-semibold text-[#191F28]">
            {stock?.name ?? record.symbol}
          </span>
        </div>

        <div className="relative mb-[11.5px] ml-auto flex items-center">
          <span className="absolute -top-[18px] right-0 text-[14px] whitespace-nowrap text-[#4E5660CC]">
            {record.unitPrice ? `${record.quantity}주` : ''}
          </span>
          <p className="text-[18px] leading-none font-semibold text-gray-900">
            {record.unitPrice ? `${record.unitPrice.toLocaleString()}원` : ''}
          </p>
        </div>
      </div>

      <div className="-mb-[3px] flex items-center justify-between">
        <span
          className="rounded-md px-[6px] py-[4px] text-[12px] font-semibold"
          style={{
            backgroundColor: emotion?.bgColor,
            color: emotion?.color,
          }}
        >
          {emotion?.label} Lv.
          <span className="font-bold"> {record.emotionIntensity}</span>
        </span>
        <span className="rounded bg-[#F2F4F6] px-1.5 py-0.5 text-[12px] font-medium text-[#8B95A1]">
          {TRADE_ACTION_LABEL_MAP[record.tradeAction]}
        </span>
      </div>
    </div>
  );
};
