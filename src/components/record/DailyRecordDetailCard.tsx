interface CardProps {
  record: {
    instrumentName: string;
    tradeAction: 'BUY' | 'SELL';
    unitPrice: number;
    quantity: number;
    memoPreview: string;
    recordedAt: string;
  };
}

const DailyRecordDetailCard = ({ record }: CardProps) => {
  return (
    <div className="mt-[20px] rounded-2xl bg-white p-[20px] shadow-sm">
      <h2 className="text-[18px] font-bold text-gray-900">
        {record.instrumentName}
        <span
          className={`ml-2 ${
            record.tradeAction === 'BUY'
              ? 'text-red-500'
              : 'text-blue-500'
          }`}
        >
          {record.tradeAction === 'BUY' ? '매수' : '매도'}
        </span>
      </h2>

      <p className="mt-[12px] text-[22px] font-bold">
        {(record.unitPrice * record.quantity).toLocaleString()}원
      </p>

      <div className="mt-[12px] flex justify-between text-[13px] text-gray-400">
        <span>{record.unitPrice.toLocaleString()}원</span>
        <span>{record.quantity}주</span>
      </div>

      <p className="mt-[20px] text-[13px] text-gray-700 leading-relaxed">
        "{record.memoPreview}"
      </p>
    </div>
  );
};

export default DailyRecordDetailCard;
