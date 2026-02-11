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
  const currentData = isWeekly 
    ? REPORT_DUMMY_DATA.weekly[week as keyof typeof REPORT_DUMMY_DATA.weekly] 
    : REPORT_DUMMY_DATA.monthly;

  const reportTitle = isWeekly ? '위클리 리포트' : `${yearMonth?.slice(6, 8)}월 리포트`;
  const displayGreeting = currentData.greeting.replace("%s", nickname || "핀리");

  return (
    <div className="relative flex h-full flex-col bg-[#05101D] overflow-hidden text-white">
      <ReportDetailHeader title={reportTitle} />

      <main className="relative flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
        <div className="relative min-h-full px-[16px] pt-[30px] ">
          <div className="absolute top-[40px] left-1/2 -translate-x-1/2 w-[89px] h-[89px] rounded-full bg-gradient-to-br from-[rgba(17,121,234,0.2)] to-[rgba(216,149,255,0.2)] blur-[30px] z-10" />
        
          <h2 className="text-[20px] font-bold leading-snug whitespace-pre-line">{displayGreeting}</h2>

          <MindPiece type={isWeekly ? 'weekly' : 'monthly'} week={week} />
          <AIFeedBack type={isWeekly ? 'weekly' : 'monthly'} week={week} />

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
                <>
                  <BestDecisionCard emoji="😎" emojiBgColor="#FFDCDC" title="삼성전자" action="매도" date="2월 20일" holdingWeeks={2} price="152,400원" rate="50%" />
                  <BestDecisionCard emoji="🧘‍♂️" emojiBgColor="#ECF7FF" title="엔비디아" action="매도" date="2월 20일" holdingWeeks={2} price="273,300원" rate="20%" />
                </>
              )}
            </div>
          </section>

          <button
            onClick={() => navigate('/reports')}
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