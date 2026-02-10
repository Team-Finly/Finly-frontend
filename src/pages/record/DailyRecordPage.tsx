import CalendarModal from '@/components/record/CalendarModal';
import DailyRecordHeader from '@/components/record/DailyRecordHeader';
import DailyRecordTimeLine from '@/components/record/DailyRecordTimeLine';
import DailyRecordTitle from '@/components/record/DailyRecordTitle';
import { useTodayRecords } from '@/hooks/useTodayRecords';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DailyRecordPage = () => {
  const navigate = useNavigate();
  const { date } = useParams<{ date: string }>();
  const targetDate = date ?? '';

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const { data, isLoading, isError, error } = useTodayRecords(targetDate);

  return (
    <div className="h-screen pt-[76px]"
      style={{
        background: 'linear-gradient(to bottom, #F4F5F7 50%, #FFFFFF 50%)'
      }}>
      <DailyRecordHeader
        title={targetDate}
        onCalendarClick={() => setIsCalendarOpen(true)}
      />

      {isLoading ? (
        <div className="flex flex-col bg-white items-center justify-center h-full">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          </div>
    
          <p className="mt-5 text-gray-400 text-sm font-medium tracking-tight animate-pulse">
            기록을 불러오고 있어요
          </p>
        </div>
      ) : isError ? (
        <div className="flex flex-col bg-white items-center justify-center h-full px-6 text-center">
          <p className="text-lg font-semibold text-gray-800">
            데이터를 불러오지 못했어요
          </p>
          <p className="mt-2 text-sm text-gray-500">
            {(error as Error)?.message ?? '서버 오류가 발생했습니다.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm"
          >
            다시 시도
          </button>
        </div>
      ) : data ? (
        <>
          <DailyRecordTitle
            timelineSummary={data.timelineSummary}
            hasRecords={data.hasRecords}
          />
          <DailyRecordTimeLine
            timelineSummary={data.timelineSummary}
            prismFeedback={data.prismFeedback}
            hasRecords={data.hasRecords}
            onItemClick={(recordId: number) => {
              navigate(`/record/${data.date}/${recordId}`);
            }}
          />
        </>
      ) : null}
      
      {isCalendarOpen && (
        <CalendarModal onClose={() => setIsCalendarOpen(false)} />
      )}
    </div>
  );
};

export default DailyRecordPage;
