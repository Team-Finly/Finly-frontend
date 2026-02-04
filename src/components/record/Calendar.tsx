import React, { useState, useRef, useEffect } from 'react';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import ArrowRight from '@/assets/icons/arrow-right.svg';
import { EMOTIONS } from '@/constants/emotions';
import type { MonthlyRecordResponse } from '@/types/record';
import { useNavigate } from 'react-router-dom';

interface CalendarProps {
  onClose?: () => void;
}

const Calendar = ({ onClose }: CalendarProps) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0, time: 0 });
  const navigate = useNavigate();

  const [baseDate, setBaseDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [monthData] = useState<MonthlyRecordResponse>({
    year: 2026,
    month: 1,
    days: [
      { date: '2026-01-06', hasRecord: true, emotions: ['CONFIDENCE'] },
      { date: '2026-01-14', hasRecord: true, emotions: ['CALM', 'GREED'] },
      { date: '2026-01-17', hasRecord: true, emotions: ['ANXIETY', 'REGRET'] },
      { date: '2026-01-19', hasRecord: false, emotions: [] },
    ],
  });

  const getDayRecord = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    return monthData.days.find((d) => d.date === dateStr);
  };

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

  const handleTouchStart = (e: React.TouchEvent) => {
    onStart(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    onEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    onStart(e.clientX, e.clientY);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    onEnd(e.clientX, e.clientY);
  };

  useEffect(() => {
    const el = calendarRef.current;
    if (!el) return;
    const handleTouchMove = (e: TouchEvent) => {
      const dX = Math.abs(dragStart.current.x - e.touches[0].clientX);
      const dY = Math.abs(dragStart.current.y - e.touches[0].clientY);
      if (dX > dY && dX > 10) {
        if (e.cancelable) e.preventDefault();
      }
    };
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => el.removeEventListener('touchmove', handleTouchMove);
  }, []);

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
  const displayYear = baseDate.getFullYear();
  const displayMonth = baseDate.getMonth() + 1;
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  const handleDayClick = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    navigate(`/record/${year}-${month}-${day}`);

    if (onClose) onClose();
  };

  return (
    <div
      ref={calendarRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ touchAction: 'pan-y', cursor: 'grab' }}
      className="overflow-hidden rounded-xl bg-white transition-all duration-300 select-none active:cursor-grabbing"
    >
      <div className="flex h-14 items-center justify-between p-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {displayYear}년 {displayMonth}월
        </h2>
        <div className="flex items-center gap-2">
          <button onClick={() => moveMonth(-1)} className="cursor-pointer p-1">
            <img src={ArrowLeft} alt="이전 월" />
          </button>
          <p
            className="cursor-pointer px-2 text-sm text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              const now = new Date();
              setBaseDate(new Date(now.getFullYear(), now.getMonth(), 1));
            }}
          >
            Today
          </p>
          <button onClick={() => moveMonth(1)} className="cursor-pointer p-1">
            <img src={ArrowRight} alt="다음 월" />
          </button>
        </div>
      </div>

      <div className="flex h-7.5 w-full items-start px-5 py-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="flex-1 text-center text-[13px] font-semibold text-gray-300"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 px-5 pt-2">
        {displayedDays.map((date, index) => {
          const isToday = date.toDateString() === new Date().toDateString();
          const dateMonthValue = date.getFullYear() * 12 + date.getMonth();
          const baseMonthValue =
            baseDate.getFullYear() * 12 + baseDate.getMonth();
          const isPrevMonth = dateMonthValue < baseMonthValue;
          const isNextMonth = dateMonthValue > baseMonthValue;
          const record = getDayRecord(date);

          const isClickable = !isPrevMonth && !isNextMonth;

          return (
            <div
              key={index}
              onClick={() => {
                if (isClickable) handleDayClick(date);
              }}
              className={`relative flex min-h-11.5 flex-col items-center ${!isPrevMonth && !isNextMonth ? 'cursor-pointer' : 'pointer-events-none'} `}
            >
              {isToday && (
                <div className="bg-secondary/6 border-primary absolute top-0 z-0 h-11.5 w-full max-w-10 rounded-lg border" />
              )}
              <span
                className={`flex h-8 items-center justify-center font-semibold ${
                  isPrevMonth || isNextMonth
                    ? 'text-gray-300/80'
                    : 'text-gray-900'
                }`}
              >
                {date.getDate()}
              </span>
              {!isPrevMonth && !isNextMonth && record && record.hasRecord && (
                <div className="mt-1 mb-0.5 flex h-1 w-full max-w-8 overflow-hidden rounded-full bg-gray-50">
                  {record.emotions.map((emotion, i) => (
                    <div
                      key={i}
                      className="h-full"
                      style={{
                        width: `${100 / record.emotions.length}%`,
                        backgroundColor:
                          EMOTIONS.find((e) => e.key === emotion)?.color ||
                          'var(--color-gray-200)',
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-1.25 py-2">
        {EMOTIONS.map((emotion) => (
          <div key={emotion.key} className="flex items-center gap-1">
            <div
              className="h-1.25 w-1.25 rounded-full"
              style={{ backgroundColor: emotion.color }}
            />
            <p className="text-[8px] font-semibold text-gray-300">
              {emotion.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
