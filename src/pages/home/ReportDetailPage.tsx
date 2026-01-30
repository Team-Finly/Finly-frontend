import { useParams, useNavigate } from 'react-router-dom';
import ReportImage from '@/assets/images/reportImage.png';
import ReportDetailHeader from '@/components/home/Report/ReportDetailHeader';
import BestDecisionCard from '@/components/home/Report/BestDecisionCard';
import AIFeedBack from '@/components/home/Report/AIFeedBack';
import MindPiece from '@/components/home/Report/MindPiece'; 

const ReportDetailPage = () => {
  const navigate = useNavigate();
  const { yearMonth } = useParams<{ yearMonth: string }>();

  return (
    <div className="relative flex h-full flex-col bg-[#05101D] overflow-hidden text-white">
      <ReportDetailHeader title={`${yearMonth?.slice(6)}월 리포트`} />

      <img
        src={ReportImage}
        alt="report background"
        className="absolute bottom-0 right-0 w-[253.73px] pointer-events-none z-0"
      />
      <main className="relative flex-1 overflow-y-auto overflow-x-hidden px-[16px] pt-[30px] scrollbar-hide">
        <div className="absolute top-[40px] left-1/2 -translate-x-1/2 w-[89px] h-[89px] rounded-full bg-gradient-to-br from-[rgba(17,121,234,0.2)] to-[rgba(216,149,255,0.2)] blur-[30px] z-10" />
        
        <h2 className="text-[20px] font-bold leading-snug">
          지난 2월, 토리님은
          <br />
          감정에 휘둘리지 않은 투자를 이어갔어요
        </h2>

        <MindPiece />
        <AIFeedBack />

        <section className="mt-[50px]">
          <h3 className="mb-[20px] text-[17px] font-bold">베스트 판단 결과</h3>

          <div className="space-y-[14px]">
            <BestDecisionCard
              emoji="😎"
              emojiBgColor="#FFDCDC"
              title="삼성전자"
              action="매도"
              date="2월 20일"
              holdingWeeks={2}
              price="152,400원"
              rate="50%"
            />

            <BestDecisionCard
              emoji="🧘‍♂️"
              emojiBgColor="#ECF7FF"
              title="엔비디아"
              action="매도"
              date="2월 20일"
              holdingWeeks={2}
              price="273,300원"
              rate="20%"
            />
          </div>
        </section>

        <button
          onClick={() => navigate('/mypage/reports')}
          className="flex items-center justify-center mx-auto text-[16px] font-semibold mt-[40px] mb-[50px] text-white cursor-pointer"
        >
          지난 리포트 전체보기
        </button>
      </main>
    </div>
  );
};

export default ReportDetailPage;