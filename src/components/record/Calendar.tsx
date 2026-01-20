import React, { useState, useRef, useEffect } from 'react';
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import ArrowRight from '../../assets/icons/arrow-right.svg';
import { EMOTIONS } from '../../constants/emtions';
import type { MonthlyRecordResponse } from '@/types/record';

const Calendar = () => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const touchStart = useRef({ x: 0, y: 0 });

  const [monthData, setMonthData] = useState<MonthlyRecordResponse>({
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

  // 오늘이 포함된 주의 토요일
  const [baseDate, setBaseDate] = useState(() => {
    const date = new Date();
    const day = date.getDay();
    date.setDate(date.getDate() + (6 - day));
    return date;
  });

  const getDisplayedDays = () => {
    const days = [];
    const startDay = new Date(baseDate); // startDay는 3주 분량 날짜 중 첫 번째 날
    startDay.setDate(baseDate.getDate() - 20);

    for (let i = 0; i < 21; i++) {
      const day = new Date(startDay);
      day.setDate(startDay.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const displayedDays = getDisplayedDays();

  const moveWeek = (offset: number) => {
    const newDate = new Date(baseDate);
    newDate.setDate(baseDate.getDate() + offset * 7);
    setBaseDate(newDate);
  };

  const moveMonth = (offset: number) => {
    const newDate = new Date(baseDate);
    newDate.setMonth(baseDate.getMonth() + offset);
    newDate.setDate(1);
    const day = newDate.getDay();
    newDate.setDate(newDate.getDate() + (6 - day) + 14);
    setBaseDate(newDate);
  };

  const handleWheel = (e: WheelEvent) => {
    if (e.cancelable) e.preventDefault();
    if (isScrolling.current) return;
    isScrolling.current = true;

    const offset = e.deltaY < 0 ? -1 : 1;
    moveWeek(offset);
    setTimeout(() => {
      isScrolling.current = false;
    }, 200);
  };

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (!calendarEl) return;
    calendarEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      calendarEl.removeEventListener('wheel', handleWheel);
    };
  }, [baseDate]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = touchStart.current.x - e.changedTouches[0].clientX;
    const deltaY = touchStart.current.y - e.changedTouches[0].clientY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      moveMonth(deltaX > 0 ? 1 : -1);
    }
  };

  const displayYear = baseDate.getFullYear();
  const displayMonth = baseDate.getMonth() + 1;

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div
      ref={calendarRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="rounded-xl bg-white transition-all duration-300 select-none"
    >
      <div className="flex h-14 items-center justify-between p-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {displayYear}년 {displayMonth}월
        </h2>
        <div className="flex items-center gap-2">
          <button onClick={() => moveMonth(-1)} className="cursor-pointer p-1">
            <img src={ArrowLeft} alt="이전 월" />
          </button>
          <p className="px-2 text-sm text-gray-500">Today</p>
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
      <div className="grid grid-cols-7 gap-y-0.75 px-5 pt-2">
        {displayedDays.map((date, index) => {
          const isToday = date.toDateString() === new Date().toDateString();
          const isFuture = date > new Date();
          const record = getDayRecord(date);
          return (
            <div
              key={index}
              className="relative flex min-h-12 flex-col items-center"
            >
              {isToday && (
                <div className="bg-secondary/4 border-secondary absolute top-0 z-0 h-12 w-full max-w-10 rounded-lg border-2" />
              )}
              <span
                className={`z-10 flex h-8 items-center justify-center font-semibold ${
                  isToday
                    ? 'text-blue-500'
                    : isFuture
                      ? 'text-gray-200'
                      : 'text-gray-900'
                }`}
              >
                {date.getDate()}
              </span>
              {record && record.hasRecord && (
                <div className="z-10 mt-1 mb-2 flex h-1 w-full max-w-8 overflow-hidden rounded-full bg-gray-50">
                  {record.emotions.map((emotion, i) => {
                    const emo = EMOTIONS.find((e) => e.key === emotion);
                    return (
                      <div
                        key={i}
                        className={`h-full ${emo?.color || 'bg-gray-200'}`}
                        style={{ width: `${100 / record.emotions.length}%` }}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-1.25 py-2">
        {EMOTIONS.map((emotion) => (
          <div key={emotion.key} className="flex items-center gap-1">
            <div className={`${emotion.color} h-1.25 w-1.25 rounded-full`} />
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
