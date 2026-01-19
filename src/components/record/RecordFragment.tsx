import React from 'react';
import type { DailyFragment } from './../../types/record';
import { EMOTIONS } from '../../constants/emtions';
import { getRelativeTime } from '@/utils/date';

interface RecordFragmentProps {
  data: DailyFragment;
}

const RecordFragment = ({ data }: RecordFragmentProps) => {
  const emotion = EMOTIONS.find((e) => e.key === data.emotion);
  const date = new Date(data.recordedAt);
  const formattedDate = `${date.getMonth() + 1}월 ${date.getDate()}일`;

  if (!emotion) return null;

  return (
    <div className="flex h-21.5 w-full items-center justify-between rounded-xl border border-gray-100 px-3.25 py-5">
      <div
        className="flex h-12.5 w-12.5 items-center justify-center rounded-[10px]"
        style={{ backgroundColor: emotion.bg }}
      >
        <img className="h-5.5 w-5.5" src={emotion.icon} alt={emotion.label} />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="ml-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <p className="text-3.75 font-semibold">{data.instrumentName}</p>
            <div className="flex items-center justify-center rounded-[8.5px] bg-gray-100 px-1.75 py-0.5">
              <p className="text-xs text-gray-700/80">{data.tradeAction}</p>
            </div>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            {data.unitPrice.toLocaleString()}원
          </p>
        </div>
        <div className="ml-3 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-gray-300">
            <p>{formattedDate}</p>
            <p>·</p>
            <p>{emotion.label}</p>
          </div>
          <p className="text-sm text-gray-700/80">
            {getRelativeTime(data.recordedAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecordFragment;
