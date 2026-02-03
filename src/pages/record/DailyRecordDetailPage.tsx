import FinlyTalk from '@/components/FinlyTalk';
import DailyDetailHeader from '@/components/record/DailyDetailHeader';
import DailyRecordDetailCard from '@/components/record/DailyRecordDetailCard';
import { EMOTIONS } from '@/constants/emotions';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

interface RecordItem {
  recordId: number;
  symbol: string; // 종목코드
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
}

const MOCK_RECORDS: RecordItem[] = [
  {
    recordId: 101,
    symbol: '005930',
    instrumentName: '삼성전자',
    tradeAction: 'BUY',
    unitPrice: 74200,
    quantity: 10,
    memo: '외인 매수세 확인 후 1차 진입.',
    recordDate: '2026-01-06',
    recordedAt: '2026-01-06T10:05:00',
    session: 'MORNING',
    emotionCode: 'CALM',
    emotionIntensity: 3,
  },
  {
    recordId: 102,
    symbol: '005930',
    instrumentName: '삼성전자',
    tradeAction: 'BUY',
    unitPrice: 74200,
    quantity: 10,
    memo: '외인 매수세 확인 후 1차 진입.',
    recordDate: '2026-01-06',
    recordedAt: '2026-01-06T10:05:00',
    session: 'MORNING',
    emotionCode: 'GREED',
    emotionIntensity: 3,
  },
  {
    recordId: 103,
    symbol: '005930',
    instrumentName: '삼성전자',
    tradeAction: 'BUY',
    unitPrice: 74200,
    quantity: 10,
    memo: '외인 매수세 확인 후 1차 진입.',
    recordDate: '2026-01-06',
    recordedAt: '2026-01-06T10:05:00',
    session: 'MORNING',
    emotionCode: 'CONFIDENCE',
    emotionIntensity: 3,
  }
];

const DailyRecordDetailPage = () => {
  const { recordId } = useParams<{ recordId: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const getEmotionData = (key: string) => EMOTIONS.find((e) => e.key === key);

  // recordId를 기준으로 초기 인덱스 찾고 해당 위치로 스크롤
  useEffect(() => {
    const initialIndex = MOCK_RECORDS.findIndex(
      r => r.recordId === Number(recordId)
    );
    if (initialIndex !== -1) {
      setCurrentIndex(initialIndex);
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollLeft = initialIndex * containerRef.current.offsetWidth;
        }
      }, 0);
    }
  }, [recordId]);
  
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, offsetWidth } = containerRef.current;
    const index = Math.round(scrollLeft / offsetWidth);
    setCurrentIndex(index);
  };

  const currentRecord = MOCK_RECORDS[currentIndex];

  if (!currentRecord) return <div className="h-screen flex items-center justify-center">기록을 찾을 수 없습니다.</div>;

  const emotion = getEmotionData(currentRecord.emotionCode);
  const showPagination = MOCK_RECORDS.length >= 2;

  return (
    <div className="h-screen bg-white pt-[76px] flex flex-col">
      <DailyDetailHeader title="기록 상세" />

      <div className="flex flex-col items-center mt-[30px]">
        <span className="text-gray-700 text-[16px] font-semibold mb-[16px]">
          {currentRecord.recordDate}
        </span>
        {emotion && (
          <div
            className="flex items-center gap-0.5 px-[8px] py-[6.5px] rounded-full text-[14px] font-semibold mb-[24px]"
            style={{
              backgroundColor: emotion.bgColor,
              color: emotion.color           
            }}
          >
            <img
              src={emotion.icon}
              alt={emotion.label}
              className="w-[18px] h-[18px] object-contain"
            />
    
            <span className="leading-none font-bold">
              {emotion.label} Lv.{currentRecord.emotionIntensity}
            </span>
          </div>
        )}
      </div>
      
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        <div className="flex h-full">
          {MOCK_RECORDS.map((item) => (
            <DailyRecordDetailCard key={item.recordId} record={item} />
          ))}
        </div>
      </div>

      {/* 하단 페이지네이션 바 */}
      {showPagination && (
        <div className="py-8 flex justify-center items-center gap-[4px]">
          {MOCK_RECORDS.map((_, index) => (
            <div
              key={index}
              className={`h-[4px] rounded-[4px] transition-all duration-300 w-[24px] ${index === currentIndex ? 'bg-gray-300' : 'bg-gray-100'
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DailyRecordDetailPage;