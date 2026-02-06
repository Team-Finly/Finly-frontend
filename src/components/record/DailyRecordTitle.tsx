import Calendar3D from '@/assets/images/calendar-3d.png';
import { EMOTIONS } from '@/constants/emotions';
import type { TimelineSummaryItem } from '@/types/record';
import { useMemo } from 'react';

interface TitleProps {
  timelineSummary: TimelineSummaryItem[];
}

const DailyRecordTitle = ({ timelineSummary }: TitleProps) => {
  console.log('전체 데이터 순서 확인:', timelineSummary);
  const { firstEmotion, lastEmotion } = useMemo(() => {
    if (!timelineSummary || timelineSummary.length === 0) {
      const defaultEmotion = EMOTIONS.find(e => e.key === 'CALM') || EMOTIONS[0];
      return { firstEmotion: defaultEmotion, lastEmotion: defaultEmotion };
    }

    const firstItem = timelineSummary[0];
    const lastItem = timelineSummary[timelineSummary.length - 1];

    const getEmotion = (code: string) => 
      EMOTIONS.find((e) => e.key === code) || EMOTIONS[0];

    return {
      firstEmotion: getEmotion(firstItem.emotionCode),
      lastEmotion: getEmotion(lastItem.emotionCode),
    };
  }, [timelineSummary]);

  return (
    <section className="relative">
      <div className="flex flex-col px-[16px] pt-[30px]">
        <span className="text-[12px] pb-[10px] font-semibold text-gray-300">데일리 리포트</span>
        <h2 className="text-[18px] font-semibold leading-snug text-gray-900">
          오늘은{' '}
          <span className='font-bold' style={{ color: firstEmotion.color }}>
            {firstEmotion.label}
          </span>
          으로 시작해
          <br />
          <span className='font-bold' style={{ color: lastEmotion.color }}>
            {lastEmotion.label}
          </span>
          으로 마무리한 날이에요
        </h2>
      </div>
      <img
        src={Calendar3D}
        alt="calendar"
        className="absolute right-[21.15px] top-[22px] h-[103px] w-[105px] object-contain rotate-[1.019deg]"
      />
    </section>
  );
};

export default DailyRecordTitle;
