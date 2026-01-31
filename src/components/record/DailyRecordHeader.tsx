import Before from '@/assets/icons/before.svg';
import CalendarIcon from '@/assets/icons/calendar.svg';
import Calendar from '@/components/record/Calendar'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
}

const DailyRecordHeader = ({ title }: HeaderProps) => {
  const navigate = useNavigate();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <div className="fixed top-0 z-1 w-full max-w-120 border-b border-gray-100 bg-white">
      <div className="relative mt-4 flex h-15 items-center justify-center bg-white px-4">
        <button
          className="absolute left-4 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <img className="h-4 w-2" src={Before} alt="이전" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        <button
          className="absolute right-4 cursor-pointer"
          onClick={() => setIsCalendarOpen(prev => !prev)}
        >
          <img className="h-[18px] w-[18px]" src={CalendarIcon} alt="날짜 선택" />
        </button>
      </div>
      
      {isCalendarOpen && (
        <div className="flex h-dvh inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsCalendarOpen(false)}
          />
          <div className="relative w-[90%] max-w-[360px] bg-white rounded-xl shadow-xl overflow-auto transform -translate-y-30">
            <Calendar onClose={() => setIsCalendarOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyRecordHeader;