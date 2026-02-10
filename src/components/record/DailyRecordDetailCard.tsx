import FinlyTalk from "@/components/FinlyTalk";
import { TRADE_ACTION_MAP } from "@/constants/tradeAction";
import { useFeedback } from "@/hooks/useFeedback";
import { stockInfoStore } from "@/store/stockInfoStore";
import type { RecordDetailResponse } from "@/types/record";
import { formatTime2 } from "@/utils/date";
import { useEffect, useState } from "react";

interface CardProps {
  record: RecordDetailResponse;
}

const DailyRecordDetailCard = ({ record }: CardProps) => {
  const totalPrice = record.unitPrice * record.quantity;
  const { stockMap, isLoaded } = stockInfoStore();
  const stock = stockMap[record.symbol];
  const action = TRADE_ACTION_MAP[record.tradeAction];

  const [tryCount, setTryCount] = useState(0);

  const enabled =
    !!record.recordId &&
    !!record.memo &&
    tryCount < 2;

  const { data: feedback, isError } = useFeedback(
    record.recordId,
    { enabled }
  );
  
  useEffect(() => {
    if (isError) {
      setTryCount((prev) => prev + 1);
    }
  }, [isError]);

  return (
    <div className="min-w-full snap-center px-[16px]">
      <div 
        className="bg-white border border-gray-100 rounded-[20px] px-[20px] py-[30px] shadow-md"
        style={{ boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)' }}
      >
        <div className="flex items-center gap-[8px] mb-[20px]">
            {stock?.logoUrl && (
              <img src={stock.logoUrl} alt={stock.name} className="w-[24px] h-[24px] object-contain rounded-full" />
            )}
          <span className="text-[18px] font-bold text-gray-700">
            {stock?.name || (isLoaded ? '알 수 없는 종목' : '로딩 중...')}
          </span>
          <span className="text-[14px] font-bold" style={{ color: action.color }}>
            {action.label}
          </span>
        </div>

        <div className="text-[20px] font-bold text-gray-900 mb-[16px]">
          {record.unitPrice ? `${totalPrice.toLocaleString()}원` : '-'}
        </div>

        <div className="grid grid-cols-2 gap-4 pb-[24px] border-b border-gray-100 mb-[24px]">
          <div>
            <div className="text-gray-300 text-[12px] mb-[4px]">단가</div>
            <div className="text-gray-900 text-[16px] font-semibold">
              {record.unitPrice ? `${record.unitPrice.toLocaleString()}원` : '-'}
            </div>
          </div>
          <div>
            <div className="text-gray-300 text-[12px] mb-[4px]">수량</div>
            <div className="text-gray-900 text-[16px] font-semibold">
              {record.unitPrice ? `${record.quantity}주` : '  -'}
            </div>
          </div>
        </div>

        <div className="text-gray-300 text-[12px] mb-[8px] font-semibold">
          {formatTime2(record.recordedAt)}
        </div>
        <p className="text-gray-700 text-[14px] leading-relaxed">
          “{record.memo}”
        </p>
      </div>

      <div className="mx-[-16px] mt-[-4px]">
        <FinlyTalk 
          recordId={record.recordId}
          content={feedback?.content} 
          status={feedback?.status || 'PENDING'}
        />
      </div>
    </div>
  );
};

export default DailyRecordDetailCard;