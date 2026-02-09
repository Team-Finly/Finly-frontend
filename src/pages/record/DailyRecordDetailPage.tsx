import DailyDetailHeader from '@/components/record/DailyDetailHeader';
import DailyRecordDetailCard from '@/components/record/DailyRecordDetailCard';
import { EMOTIONS } from '@/constants/emotions';
import { useRecordDetail } from '@/hooks/useRecordDetail';
import { useTodayRecords } from '@/hooks/useTodayRecords';
import { formatDate } from '@/utils/date';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DailyRecordDetailPage = () => {
  const navigate = useNavigate();
  const { recordId } = useParams<{ recordId: string }>();
  const numericRecordId = Number(recordId);

  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const {
    data: recordDetail,
    isLoading: isDetailLoading,
    isError: isDetailError,
  } = useRecordDetail(numericRecordId);

  const recordDate = recordDetail?.recordDate ?? '';
  const {
    data: dailyDetail,
    isLoading: isDailyLoading,
    isError: isDailyError,
  } = useTodayRecords(recordDate);

  const records = dailyDetail?.timelineSummary ?? [];

  const getEmotionData = (key: string) =>
    EMOTIONS.find((e) => e.key === key);

  // recordId 기준 초기 index 계산 + 스크롤 
  useEffect(() => {
    const index = records.findIndex(
      (r) => r.recordId === numericRecordId
    );

    if (index !== -1) {
      setCurrentIndex(index);

      requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.scrollLeft =
            index * containerRef.current.offsetWidth;
        }
      });
    }
  }, [numericRecordId, records]);

  if (isDetailLoading || isDailyLoading) {
    return <div className="h-screen bg-white" />;
  }

  if (
    isDetailError ||
    isDailyError ||
    !recordDetail ||
    !dailyDetail
  ) {
    return (
      <div className="h-screen flex items-center justify-center">
        기록을 불러올 수 없습니다.
      </div>
    );
  }

  // 스크롤 → index 계산 
  const handleScroll = () => {
    if (!containerRef.current) return;

    const { scrollLeft, offsetWidth } = containerRef.current;

    const rawIndex = Math.round(scrollLeft / offsetWidth);
    const index = Math.min(
      Math.max(rawIndex, 0),
      records.length - 1
    );

    setCurrentIndex(index);
  };

const MAX_DOTS = 12;
const total = records.length;
let startIndex = 0;

if (total > MAX_DOTS) {
  if (currentIndex <= 5) {
    startIndex = 0;
  } else if (currentIndex >= total - 6) {
    startIndex = total - MAX_DOTS;
  } else {
    startIndex = currentIndex - 5;
  }
  };

  const visibleIndexes = Array.from(
    { length: Math.min(MAX_DOTS, total) },
    (_, i) => startIndex + i
  );
  
  const activeDotIndex = currentIndex - startIndex;

  const currentRecord = records[currentIndex];
  const emotion = currentRecord
    ? getEmotionData(currentRecord.emotionCode)
    : null;

  if (!currentRecord) {
    return (
      <div className="h-screen flex items-center justify-center">
        기록을 찾을 수 없습니다.
      </div>
    );
  }

  const showPagination = records.length >= 2;

  return (
    <div className="h-screen bg-white pt-[76px] flex flex-col">
      <DailyDetailHeader
        title="기록 상세"
        rightButton={{
          onClick: () => navigate(`/record/edit/${currentRecord.recordId}`)
        }}
      />

      <div className="flex flex-col items-center mt-[30px]">
        <span className="text-gray-700 text-[16px] font-semibold mb-[16px]">
          {formatDate(currentRecord.recordDate)}
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
          {records.map((record) => (
            <DailyRecordDetailCard key={record.recordId} record={record} />
          ))}
        </div>
      </div>

      {/* 하단 페이지네이션 바 */}
      {showPagination && (
        <div className="py-8 flex justify-center items-center gap-[4px]">
          {visibleIndexes.map((_, index) => (
            <div
              key={index}
              className={`h-[4px] rounded-[4px] transition-all duration-300 w-[24px] ${index === activeDotIndex ? 'bg-gray-300' : 'bg-gray-100'
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DailyRecordDetailPage;