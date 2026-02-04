import Calendar3D from '@/assets/images/calendar-3d.png';
import { EMOTIONS } from '@/constants/emotions';

const DailyRecordTitle = () => {
  const getEmotionData = (key: string) => EMOTIONS.find((e) => e.key === key);

  // 더미 데이터
  const reportSummary = {
    start: getEmotionData('CALM'),
    end: getEmotionData('CONFIDENCE'),
  };

  return (
    <section className="relative">
      <div className="flex flex-col px-[16px] pt-[30px]">
        <span className="text-[12px] pb-[10px] font-semibold text-gray-300">데일리 리포트</span>
        <h2 className="text-[18px] font-semibold leading-snug text-gray-900">
          오늘은{' '}
          <span className='font-bold' style={{ color: reportSummary.start?.color }}>
            {reportSummary.start?.label}
          </span>
          으로 시작해
          <br />
          <span className='font-bold' style={{ color: reportSummary.end?.color }}>
            {reportSummary.end?.label}
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
