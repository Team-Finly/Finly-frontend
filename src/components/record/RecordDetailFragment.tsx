import React from 'react';

interface RecordDetailFragmentProps {
  emotion: any;
}

const RecordDetailFragment = ({ emotion }: RecordDetailFragmentProps) => {
  return (
    <div className="shadow-card2 rounded-xl border-[1.2px] border-gray-100 px-3.75 py-4.25">
      <div className="mb-5.25 flex items-center justify-between">
        <div className="flex items-center">
          <h4 className="mr-1.5 font-semibold">삼성전자</h4>
          <div
            className="flex items-center gap-1 rounded-full px-1.75 py-0.5"
            style={{ backgroundColor: emotion.bgColor }}
          >
            <img src={emotion.icon} alt={emotion.label} className="h-3 w-3" />
            <p
              className="text-xs"
              style={{ color: emotion.textColor || emotion.color }}
            >
              {emotion.label}
            </p>
          </div>
        </div>
        <div className="text-xs font-semibold text-gray-300">2026.02.20</div>
      </div>
      <p className="line-clamp-2 text-xs break-all text-gray-700">
        "외인 매수세 확인 후 1차 진입. 지지선 터치 시 추가 매수 고려."
      </p>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm">
          <p className="text-stock-buy">매수</p>
          <p className="text-gray-300">·</p>
          <p className="font-semibold text-gray-500">72,400원</p>
        </div>
        <p className="text-sm text-gray-500">10주</p>
      </div>
    </div>
  );
};

export default RecordDetailFragment;
