import CalendarModal from '@/components/record/CalendarModal';
import DailyRecordHeader from '@/components/record/DailyRecordHeader';
import DailyRecordTimeLine from '@/components/record/DailyRecordTimeLine';
import DailyRecordTitle from '@/components/record/DailyRecordTitle';
import type { TimelineSection } from '@/types/record';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const MOCK_SECTIONS: TimelineSection[] = [
  {
    session: "MORNING",
    items: [
      {
        recordId: 101,
        instrumentId: 5,
        instrumentName: "삼성전자",
        emotionCode: "CALM",
        emotionDisplay: "확신",
        tradeAction: "BUY",
        unitPrice: 74200,
        quantity: 10,
        memoPreview: "외인 매수세 확인 후 1차 진입. 지지선 터치 시 추가 매수 고려.",
        recordedAt: "2026-01-06T10:05:00"
      },
      {
        recordId: 102,
        instrumentId: 6,
        instrumentName: "SK하이닉스",
        emotionCode: "GREED",
        emotionDisplay: "확신",
        tradeAction: "BUY",
        unitPrice: 142000,
        quantity: 5,
        memoPreview: "급등세 보고 추격 매수 진입.",
        recordedAt: "2026-01-06T11:30:00"
      }
    ]
  },
  {
    session: "AFTERNOON",
    items: [
      {
        recordId: 103,
        instrumentId: 5,
        instrumentName: "삼성전자",
        emotionCode: "CONFIDENCE",
        emotionDisplay: "확신",
        tradeAction: "BUY",
        unitPrice: 74500,
        quantity: 10,
        memoPreview: "오후장 지지 확인 후 비중 확대.",
        recordedAt: "2026-01-06T14:20:00"
      },
    ]
  },
  {
    session: "CLOSE",
    items: []
  }
];

const DailyRecordPage = () => {
  const { date } = useParams<{ date: string }>();  
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <div className="h-screen  bg-[#F4F5F7] pt-[76px]">
      <DailyRecordHeader title={`${date}`} onCalendarClick={() => setIsCalendarOpen(true)} />
      
      <DailyRecordTitle />
 
      <DailyRecordTimeLine sections={MOCK_SECTIONS} />
      
      {isCalendarOpen && (
        <CalendarModal onClose={() => setIsCalendarOpen(false)} />
      )}
    </div>
  );
};

export default DailyRecordPage;