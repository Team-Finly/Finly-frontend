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
    const index = Math.round(scrollLeft / offsetWidth);
    setCurrentIndex(index);
  };

  const currentRecord = records[currentIndex];
  const emotion = currentRecord
    ? getEmotionData(currentRecord.emotionCode)
    : null;

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

      <div className="mt-[30px] flex flex-col items-center">
        <span className="mb-[16px] text-[16px] font-semibold text-gray-700">
          {formatDate(currentRecord.recordDate)}
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
              {emotion.label} Lv.{currentRecord.emotionIntensity}
            </span>
          </div>
        )}
      </div>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="scrollbar-hide flex-1 snap-x snap-mandatory overflow-x-auto"
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
        <div className="flex items-center justify-center gap-[4px] py-8">
          {records.map((_, index) => (
            <div
              key={index}
              className={`h-[4px] w-[24px] rounded-[4px] transition-all duration-300 ${
                index === currentIndex ? 'bg-gray-300' : 'bg-gray-100'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DailyRecordDetailPage;
