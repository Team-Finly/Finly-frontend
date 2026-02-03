import { useState, useEffect } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from 'date-fns';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import ArrowRight from '@/assets/icons/arrow-right.svg';

interface SelectDateModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

const SelectDateModal = ({
  isOpen,
  onClose,
  selectedDate,
  onDateSelect,
}: SelectDateModalProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    if (isOpen) {
      setCurrentMonth(new Date(selectedDate || new Date()));
    }
  }, [isOpen, selectedDate]);

  if (!isOpen) return null;

  const renderHeader = () => (
    <div className="flex h-14 items-center justify-between p-2">
      <h2 className="text-lg font-semibold text-gray-900">
        {format(currentMonth, 'yyyy년 M월')}
      </h2>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="cursor-pointer rounded-full p-1 hover:bg-gray-100"
        >
          <img src={ArrowLeft} alt="이전 월" />
        </button>
        <button
          onClick={() => setCurrentMonth(new Date())}
          className="px-2 text-sm font-medium text-gray-500 hover:text-blue-500"
        >
          Today
        </button>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="cursor-pointer rounded-full p-1 hover:bg-gray-100"
        >
          <img src={ArrowRight} alt="다음 월" />
        </button>
      </div>
    </div>
  );

  const renderDays = () => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return (
      <div className="mb-2 flex h-7.5 w-full items-start py-2">
        {days.map((day) => (
          <div
            key={day}
            className="flex-1 text-center text-[13px] font-semibold text-gray-300"
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const formattedDate = format(day, 'd');
        const isSelected = isSameDay(day, new Date(selectedDate));
        const isCurrentMonth = isSameMonth(day, monthStart);

        days.push(
          <div
            key={day.toString()}
            className="relative flex min-h-12 flex-1 cursor-pointer flex-col items-center"
            onClick={() => {
              onDateSelect(format(cloneDay, 'yyyy-MM-dd'));
              onClose();
            }}
          >
            {isSelected && (
              <div className="absolute top-0 z-0 h-11.5 w-10 rounded-lg border-2 border-blue-500 bg-blue-50/50" />
            )}
            <span
              className={`z-10 flex h-8 items-start justify-center pt-2 text-[14px] font-semibold ${
                !isCurrentMonth ? 'text-gray-200' : 'text-gray-900'
              }`}
            >
              {formattedDate}
            </span>
          </div>,
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="flex w-full">
          {days}
        </div>,
      );
      days = [];
    }
    return <div className="flex w-full flex-col">{rows}</div>;
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="animate-fadeIn relative w-full max-w-79 rounded-[20px] bg-white p-2 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
};

export default SelectDateModal;
