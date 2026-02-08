import React from 'react';
import type { FragmentItem } from '@/types/record';
import { EMOTION_CHART_MAP } from '@/constants/emotions';
import { formatDate2 } from '@/utils/date';
import { TRADE_ACTION_MAP } from '@/constants/tradeAction';

interface RecordDetailFragmentProps {
  fragment: FragmentItem;
}

const RecordDetailFragment = ({ fragment }: RecordDetailFragmentProps) => {
  const emotion = EMOTION_CHART_MAP[fragment.emotionCode];
  if (!emotion) return null;

  const tradeAction = TRADE_ACTION_MAP[fragment.stock.tradeAction];

  return (
    <div className="shadow-card2 rounded-xl border-[1.2px] border-gray-100 px-3.75 py-4.25">
      <div className="mb-5.25 flex items-center justify-between">
        <div className="flex items-center">
          <h4 className="mr-1.5 font-semibold">{fragment.stock.stockName}</h4>
          <div
            className="flex items-center gap-1 rounded-full px-1.75 py-0.5"
            style={{ backgroundColor: emotion.bgColor }}
          >
            <img src={emotion.icon} alt={emotion.label} className="h-3 w-3" />
            <p
              className="text-xs"
              style={{ color: (emotion as any).textColor || emotion.color }}
            >
              {emotion.label}
            </p>
          </div>
        </div>
        <div className="text-xs font-semibold text-gray-300">
          {formatDate2(fragment.recordDate)}
        </div>
      </div>
      <p className="line-clamp-2 text-xs break-all text-gray-700">
        "{fragment.memo}"
      </p>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm">
          <p style={{ color: tradeAction.color }}>{tradeAction.label}</p>
          <p className="text-gray-300">·</p>
          <p className="font-semibold text-gray-500">
            {fragment.unitPrice.toLocaleString()}원
          </p>
        </div>
        <p className="text-sm text-gray-500">{fragment.quantity}주</p>
      </div>
    </div>
  );
};

export default RecordDetailFragment;
