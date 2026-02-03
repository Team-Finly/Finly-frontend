import React, { useState, useRef } from 'react';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import ArrowRight from '@/assets/icons/arrow-right.svg';

interface CalendarProps {
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
}

const MiniCalendar = ({ selectedDate, onSelect }: CalendarProps) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0, time: 0 });

  const [baseDate, setBaseDate] = useState(() => {
    const target = selectedDate || new Date();
    return new Date(target.getFullYear(), target.getMonth(), 1);
  });

  const moveMonth = (offset: number) => {
    setBaseDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1),
    );
  };

  const onStart = (clientX: number, clientY: number) => {
    dragStart.current = { x: clientX, y: clientY, time: Date.now() };
  };

  const onEnd = (clientX: number, clientY: number) => {
    const deltaX = dragStart.current.x - clientX;
    const deltaY = dragStart.current.y - clientY;
    const deltaTime = Date.now() - dragStart.current.time;

    if (
      Math.abs(deltaX) > Math.abs(deltaY) &&
      Math.abs(deltaX) > 40 &&
      deltaTime < 500
    ) {
      if (deltaX > 0) moveMonth(1);
      else moveMonth(-1);
    }
  };

  const getDisplayedDays = () => {
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const days = [];
    for (let i = firstDayOfWeek; i > 0; i--)
      days.push(new Date(year, month, 1 - i));
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= lastDayOfMonth; i++)
      days.push(new Date(year, month, i));
    const remainingSlots = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remainingSlots; i++)
      days.push(new Date(year, month + 1, i));
    return days;
  };

  const displayedDays = getDisplayedDays();
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div
      ref={calendarRef}
      onTouchStart={(e) => onStart(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={(e) =>
        onEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
      }
      onMouseDown={(e) => onStart(e.clientX, e.clientY)}
      onMouseUp={(e) => onEnd(e.clientX, e.clientY)}
      className="overflow-hidden rounded-xl bg-white shadow-[0_2px_6px_0_rgba(197,200,206,0.2)] select-none"
    >
      <div className="flex h-12 items-center justify-center">
        <div className="flex items-center gap-2">
          <button onClick={() => moveMonth(-1)}>
            <img src={ArrowLeft} alt="이전 달" className="cursor-pointer" />
          </button>
          <h2 className="font-semibold text-gray-900">
            {baseDate.getFullYear()}년 {baseDate.getMonth() + 1}월
          </h2>
          <button onClick={() => moveMonth(1)}>
            <img src={ArrowRight} alt="다음 달" className="cursor-pointer" />
          </button>
        </div>
      </div>
      <div className="flex h-7.5 items-center px-5">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="flex-1 text-center text-xs font-semibold text-gray-300"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-[3px] px-5 pt-1.5 pb-4">
        {displayedDays.map((date, index) => {
          const isSelected = selectedDate
            ? date.toDateString() === selectedDate.toDateString()
            : false;
          const dateMonthValue = date.getFullYear() * 12 + date.getMonth();
          const baseMonthValue =
            baseDate.getFullYear() * 12 + baseDate.getMonth();
          const isCurrentMonth = dateMonthValue === baseMonthValue;
          return (
            <div
              key={index}
              onClick={() => isCurrentMonth && onSelect(date)}
              className={`relative flex h-8 flex-col items-center py-1 ${isCurrentMonth ? 'cursor-pointer' : 'pointer-events-none'}`}
            >
              {isSelected && (
                <div className="bg-secondary absolute top-[3px] h-6.5 w-6.5 rounded-full" />
              )}
              <span
                className={`z-1 flex h-8 items-center justify-center text-[15px] ${
                  isSelected
                    ? 'text-white'
                    : !isCurrentMonth
                      ? 'text-gray-300/80'
                      : 'text-gray-900'
                }`}
              >
                {date.getDate()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MiniCalendar;
