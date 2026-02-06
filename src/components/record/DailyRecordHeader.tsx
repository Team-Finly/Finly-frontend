import Before from '@/assets/icons/before.svg';
import CalendarIcon from '@/assets/icons/calendar.svg';
import { formatDate } from '@/utils/date';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  onCalendarClick: () => void;
}

const DailyRecordHeader = ({ title, onCalendarClick }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 z-30 w-full max-w-120 border-b border-gray-100 bg-white">
      <div className="relative mt-4 flex h-15 items-center justify-center bg-white px-4">
        <button
          className="absolute left-4 cursor-pointer"
          onClick={() => navigate('/record')}
        >
          <img className="h-4 w-2" src={Before} alt="이전" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">{formatDate(title)}</h1>
        <button
          className="absolute right-4 cursor-pointer"
          onClick={onCalendarClick}
        >
          <img className="h-[18px] w-[18px]" src={CalendarIcon} alt="날짜 선택" />
        </button>
      </div>
    </div>
  );
};

export default DailyRecordHeader;