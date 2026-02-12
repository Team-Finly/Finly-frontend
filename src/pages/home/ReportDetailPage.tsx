import { useParams, useNavigate } from 'react-router-dom';
import ReportImage from '@/assets/images/reportImage.png';
import ReportDetailHeader from '@/components/home/Report/ReportDetailHeader';
import BestDecisionCard from '@/components/home/Report/BestDecisionCard';
import AIFeedBack from '@/components/home/Report/AIFeedBack';
import MindPiece from '@/components/home/Report/MindPiece'; 
import { REPORT_DUMMY_DATA } from '@/data/reportData';
import { useUserStore } from '@/store/userStore';

const ReportDetailPage = () => {
  const navigate = useNavigate();
  const { nickname } = useUserStore();
  const { yearMonth, week } = useParams<{ yearMonth: string; week?: string }>();

  const isWeekly = !!week;
  const monthData = yearMonth ? REPORT_DUMMY_DATA.reports[yearMonth as keyof typeof REPORT_DUMMY_DATA.reports] : null;

  if (!monthData) {
    return <div className="text-white">데이터를 찾을 수 없습니다.</div>;
  }

 const currentData = isWeekly 
    ? monthData.weekly[week as keyof typeof monthData.weekly] 
    : monthData.monthly;

  if (!currentData) {
    return <div className="text-white">리포트 상세 데이터를 찾을 수 없습니다.</div>;
  }

  const monthTitle = yearMonth?.split('-')[1].replace(/^0/, '');
  const reportTitle = isWeekly ? '위클리 리포트' : `${monthTitle}월 리포트`;
  const displayGreeting = currentData.greeting.replace("%s", nickname || "핀리");

  const reportListPath =
  yearMonth === "2026-01"
    ? '/reportsjan'
    : yearMonth === "2026-02"
    ? '/reportsfeb'
    : '/reports';

  return (
    <div className="relative flex h-full flex-col bg-[#05101D] overflow-hidden text-white">
      <ReportDetailHeader title={reportTitle} />

      <main className="relative flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
        <div className="relative min-h-full px-[16px] pt-[30px] ">
          <div className="absolute top-[40px] left-1/2 -translate-x-1/2 w-[89px] h-[89px] rounded-full bg-gradient-to-br from-[rgba(17,121,234,0.2)] to-[rgba(216,149,255,0.2)] blur-[30px] z-10" />
        
          <h2 className="text-[20px] font-bold leading-snug whitespace-pre-line">{displayGreeting}</h2>

          <MindPiece type={isWeekly ? 'weekly' : 'monthly'} week={week} yearMonth={yearMonth} />
          <AIFeedBack type={isWeekly ? 'weekly' : 'monthly'} week={week} yearMonth={yearMonth} />

          <section className="mt-[50px]">
            <h3 className="mb-[20px] text-[17px] font-bold">{currentData.sectionTitle}</h3>

            <div className="space-y-[14px]">
              {isWeekly ? (
                (currentData as any).advices.map((text: string, i: number) => (
                  <div key={i} className="relative border border-[#4E5660] rounded-[12px] px-[12px] py-[16px] text-[12px] leading-relaxed text-[#FFFFFFE5] overflow-hidden whitespace-pre-line">
                    <div className="absolute inset-0 bg-[#0C2138]/80" /> 
                    <div className="absolute inset-0 bg-white/10" />      
                    <div className="relative z-10">
                      {text}
                    </div>
                  </div>
                ))
              ) : (
                (currentData as any).bestDecisions?.map((item: any, i: number) => (
                  <BestDecisionCard 
                    key={i}
                    emoji={item.emoji}
                    emojiBgColor={item.emojiBgColor}
                    title={item.title}
                    action={item.action}
                    date={item.date}
                    holdingWeeks={item.holdingWeeks}
                    price={item.price}
                    rate={item.rate}
                  />
                ))
              )}
            </div>
          </section>

          <button
            onClick={() => navigate(reportListPath)}
            className="flex items-center justify-center mx-auto text-[16px] font-semibold mt-[40px] pb-[50px] text-white cursor-pointer"
          >
            지난 리포트 전체보기
          </button>
          <img
            src={ReportImage}
            alt="report background"
            className="absolute bottom-2 right-0 w-[253.73px] pointer-events-none z-0"
          />
        </div>
      </main>
    </div>
  );
};

export default ReportDetailPage;