import Header from '@/components/record/TitleHeader';
import CircularScore from '@/components/home/MindScore/CircularScore';
import { SCORE_CONFIG } from '@/constants/mindScore';
import MetricSection from '@/components/home/MindScore/MetricSection';
import HighlightText from '@/components/home/MindScore/HighlightText';
import exclamation from '@/assets/icons/exclamation1.svg';
import { useMindScoreDetail } from '@/hooks/useMindScoreDetail';
import { convertScoresToMetrics } from '@/utils/convertScoresToMetrics';

const MindScoreDetailPage = () => {
  const { data, isLoading, isError } = useMindScoreDetail();

  if (isLoading || isError || !data) return null;

  const score = data?.fmiScore ?? 0;

  const config =
    SCORE_CONFIG.find(c => score >= c.min && score <= c.max) ??
    SCORE_CONFIG[1];
  
  const metrics = convertScoresToMetrics(data.scores);

  return (
    <div className="min-h-screen">
      <Header title="금융 마음 지수" />

      <section className="flex flex-col items-center pt-[77px]">
        <span className="px-[10px] py-[4px] mt-[16px] rounded-full bg-gray-100 text-[14px] font-semibold text-gray-500">
          {data.fmiLevel}
        </span>

        <div className="mt-[10px] w-full flex justify-center">
          <CircularScore
            score={score}
            color={config.color}
            size={94}
          />
        </div>

        <div className="mt-[17px] px-[15px] py-[11px] bg-gray-50 rounded-full">
          <HighlightText
            text={`“${data.fmiComment}”`}
            highlight={config.highlight}
            className="text-[13px] text-gray-700"
          />
        </div>
        
      </section>

      <MetricSection metrics={metrics} />

      <div className="flex items-start mt-[30px] px-[32px]">
        <img src={exclamation} alt="info" className="mt-[2px] mr-[6px] w-[14px] h-[14px]" />
        <p className=" pb-[46px] text-[11px] text-gray-300 leading-relaxed">
          본 지표는 투자 조언 및 매수·매도 신호를 제공하지 않으며,
          수익률이나 성과와 직접적으로 연결되지 않는 참고 지표입니다.
        </p>
      </div>
      
    </div>
  );
};

export default MindScoreDetailPage;
