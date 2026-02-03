import DailyDetailHeader from '@/components/record/DailyDetailHeader';
import DailyRecordDetailCard from '@/components/record/DailyRecordDetailCard';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

interface RecordItem {
  recordId: number;
  instrumentName: string;
  tradeAction: 'BUY' | 'SELL';
  unitPrice: number;
  quantity: number;
  memoPreview: string;
  recordedAt: string;
}

const MOCK_RECORDS: RecordItem[] = [
  {
    recordId: 101,
    instrumentName: '삼성전자',
    tradeAction: 'BUY',
    unitPrice: 74200,
    quantity: 10,
    memoPreview: '외인 매수세 확인 후 1차 진입.',
    recordedAt: '2026-01-06T10:05:00',
  },
  {
    recordId: 102,
    instrumentName: 'SK하이닉스',
    tradeAction: 'BUY',
    unitPrice: 142000,
    quantity: 5,
    memoPreview: '급등세 보고 추격 매수.',
    recordedAt: '2026-01-06T11:30:00',
  },
  {
    recordId: 103,
    instrumentName: '삼성전자',
    tradeAction: 'BUY',
    unitPrice: 74500,
    quantity: 10,
    memoPreview: '오후장 지지 확인 후 비중 확대.',
    recordedAt: '2026-01-06T14:20:00',
  },
];

const DailyRecordDetailPage = () => {
  const { recordId } = useParams<{ recordId: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // recordId를 기준으로 초기 인덱스 찾고 해당 위치로 스크롤
  useEffect(() => {
    const initialIndex = MOCK_RECORDS.findIndex(
      r => r.recordId === Number(recordId)
    );

    if (initialIndex !== -1) {
      setCurrentIndex(initialIndex);
      
      // 초기 스크롤 위치 설정
      if (containerRef.current) {
        const scrollLeft = initialIndex * containerRef.current.offsetWidth;
        containerRef.current.scrollLeft = scrollLeft;
      }
    }
  }, [recordId]);

  const handleScroll = () => {
    if (!containerRef.current) return;

    const { scrollLeft, offsetWidth } = containerRef.current;
    const index = Math.round(scrollLeft / offsetWidth);
    setCurrentIndex(index);
  };

  const record = MOCK_RECORDS.find(
    r => r.recordId === Number(recordId)
  );

  if (!record) {
    return (
      <div className="h-screen flex items-center justify-center">
        기록을 찾을 수 없습니다.
      </div>
    );
  }

  // 기록이 2개 이상 12개 이하일 때만 페이지네이션 바 표시
  const showPagination = MOCK_RECORDS.length >= 2 && MOCK_RECORDS.length <= 12;

  return (
    <div className="h-screen bg-[#F4F5F7] pt-[76px] flex flex-col">
      <DailyDetailHeader title="기록 상세" />

      <div>
        {record.recordedAt.split('T')[0]}
      </div>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-x-auto snap-x snap-mandatory scrollbar-hide pt-16"
        style={{ 
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div className="flex h-full">
          {MOCK_RECORDS.map((item) => (
            <div
              key={item.recordId}
              className="min-w-full snap-center flex-shrink-0"
            >
              <DailyRecordDetailCard record={item} />
            </div>
          ))}
        </div>
      </div>

      {/* 페이지네이션 바 */}
      {showPagination && (
        <div className="pb-safe pb-6 flex justify-center items-center gap-1.5">
          {MOCK_RECORDS.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'w-6 bg-[#6C63FF]'
                  : 'w-2 bg-[#D1D5DB]'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DailyRecordDetailPage;