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
  console.log(recordDetail)

  const recordDate = recordDetail?.recordDate ?? '';
  const {
    data: dailyDetail,
    isLoading: isDailyLoading,
    isError: isDailyError,
  } = useTodayRecords(recordDate);

  const records = dailyDetail?.timelineSummary ?? [];

  const getEmotionData = (key: string) => EMOTIONS.find((e) => e.key === key);

  // recordId 기준 초기 index 계산 + 스크롤
  useEffect(() => {
    const index = records.findIndex((r) => r.recordId === numericRecordId);

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

  if (isDetailError || isDailyError || !recordDetail || !dailyDetail) {
    return (
      <div className="flex h-screen items-center justify-center">
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

  if (!currentRecord) {
    return (
      <div className="flex h-screen items-center justify-center">
        기록을 찾을 수 없습니다.
      </div>
    );
  }

  const showPagination = records.length >= 2;

  return (
    <div className="flex h-screen flex-col bg-white pt-[76px]">
      <DailyDetailHeader
        title="기록 상세"
        rightButton={{
          onClick: () => navigate(`/record/create/${currentRecord.recordId}`),
        }}
      />

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="scrollbar-hide flex-1 snap-x snap-mandatory overflow-x-auto"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        <div className="flex h-full">
          {records.map((record) => {
            const emotion = getEmotionData(record.emotionCode);

            return (
              <div
                key={record.recordId}
                className="flex-shrink-0 w-full flex flex-col items-center snap-start"
              >
                {/* 날짜 + 감정 */}
                <div className="mt-[30px] flex flex-col items-center">
                  <span className="mb-[16px] text-[16px] font-semibold text-gray-700">
                    {formatDate(record.recordDate)}
                  </span>
                  {emotion && (
                    <div
                      className="mb-[24px] flex items-center gap-0.5 rounded-full px-[8px] py-[6.5px] text-[14px] font-semibold"
                      style={{
                        backgroundColor: emotion.bgColor,
                        color: emotion.color,
                      }}
                    >
                      <img
                        src={emotion.icon}
                        alt={emotion.label}
                        className="h-[18px] w-[18px] object-contain"
                      />
                      <span className="leading-none font-bold">
                        {emotion.label} Lv.{record.emotionIntensity}
                      </span>
                    </div>
                  )}
                </div>

                {/* 카드 */}
                <DailyRecordDetailCard record={record} />
              </div>
            );
          })}
        </div>
      </div>

      {/* 하단 페이지네이션 */}
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
