interface CardProps {
  record: {
    recordId: number;
    symbol: string; 
    instrumentName: string;
    tradeAction: 'BUY' | 'SELL';
    unitPrice: number;
    quantity: number;
    memo: string;
    emotionCode: string;
    emotionIntensity: number;
    recordedAt: string;
    recordDate: string;
    session: string;
  };
}

const DailyRecordDetailCard = ({ record }: CardProps) => {
  const totalPrice = record.unitPrice * record.quantity;

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ko-KR', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="min-w-full snap-center px-[16px]">
      <div 
        className="bg-white border border-gray-100 rounded-[20px] px-[20px] py-[30px] shadow-md"
        style={{ boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)' }}
      >
        <div className="flex items-center gap-[8px] mb-[20px]">
          <div className="w-8 h-8 bg-[#034EA2] rounded-full flex items-center justify-center text-white text-[8px] font-bold overflow-hidden">
            {record.instrumentName.substring(0, 2)} {/* 종목 로고 들어갈 자리 */}
          </div>
          <span className="text-[18px] font-bold text-gray-700">
            {record.instrumentName}
          </span>
          <span className={`text-[14px] font-bold ${record.tradeAction === 'BUY' ? 'text-red-500' : 'text-blue-500'}`}>
            {record.tradeAction === 'BUY' ? '매수' : '매도'}
          </span>
        </div>

        <div className="text-[20px] font-bold text-gray-900 mb-[16px]">
          {totalPrice.toLocaleString()}원
        </div>

        <div className="grid grid-cols-2 gap-4 pb-[24px] border-b border-gray-100 mb-[24px]">
          <div>
            <div className="text-gray-300 text-[12px] mb-[4px]">단가</div>
            <div className="text-gray-900 text-[16px] font-semibold">
              {record.unitPrice.toLocaleString()}원
            </div>
          </div>
          <div>
            <div className="text-gray-300 text-[12px] mb-[4px]">수량</div>
            <div className="text-gray-900 text-[16px] font-semibold">
              {record.quantity}주
            </div>
          </div>
        </div>

        {/* 하단: 시간 및 메모 */}
        <div className="text-gray-300 text-[12px] mb-[8px] font-semibold">
          {formatTime(record.recordedAt)}
        </div>
        <p className="text-gray-700 text-[14px] leading-relaxed">
          “{record.memo}”
        </p>
      </div>
    </div>
  );
};

export default DailyRecordDetailCard;