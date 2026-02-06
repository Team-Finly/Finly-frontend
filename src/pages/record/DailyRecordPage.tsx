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

  const { data, isLoading } = useTodayRecords(targetDate);

  if (isLoading || !data) {
    return <div className="h-screen bg-[#F4F5F7]" />;
  }

  return (
    <div className="h-screen pt-[76px]"
      style={{
        background: 'linear-gradient(to bottom, #F4F5F7 50%, #FFFFFF 50%)'
      }}>
      <DailyRecordHeader
        title={targetDate}
        onCalendarClick={() => setIsCalendarOpen(true)}
      />
      
      <DailyRecordTitle />
 
      <DailyRecordTimeLine
        timelineSummary={data.timelineSummary}
        onItemClick={(recordId: number) => {
          navigate(`/record/${data.date}/${recordId}`);
        }}
      />
      
      {isCalendarOpen && (
        <CalendarModal onClose={() => setIsCalendarOpen(false)} />
      )}
    </div>
  );
};

export default DailyRecordPage;