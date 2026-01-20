import Close from '@/assets/images/stats_close.png';
import AnalysisChart from '@/components/stats/AnalysisChart';
import AnalysisCard from '@/components/stats/AnalysisCard';
import AnalysisAI from '@/components/stats/AnalysisAI';
import { useNavigate } from 'react-router-dom';

const AnalysisPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-1 flex-col">
      <header className="relative flex h-[50px] w-full flex-row items-center justify-center border-b border-gray-100">
        <div className="px-4 text-[18px] font-semibold text-gray-900">
          심층 분석
        </div>
        <img
          src={Close}
          alt="닫기"
          className="absolute right-4 h-auto w-[16px]"
          onClick={() => navigate(-1)}
        />
      </header>
      <AnalysisChart />
      <AnalysisCard />
      <AnalysisAI />
    </div>
  );
};

export default AnalysisPage;
