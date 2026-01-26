import Header from '@/components/record/TitleHeader';
import CircularScore from '@/components/home/MindScore/CircularScore';
import { SCORE_CONFIG } from '@/constants/mindScore';
import MetricSection from '@/components/home/MindScore/MetricSection';
import HighlightText from '@/components/home/MindScore/HighlightText';
import exclamation from '@/assets/icons/exclamation1.svg';

const DUMMY_SCORE = 64;

const DUMMY_METRICS = [
  {
    key: 'A',
    title: '하락장 회복 탄력성',
    score: 58,
    desc:
      '코스피가 -1% 이상 하락했을 때 부정적인 감정 조각을 남긴 비율이 다소 높습니다. 변동성 속에서 멘탈을 다듬는 연습이 필요합니다.',
  },
  {
    key: 'B',
    title: '의사결정 일치도',
    score: 72,
    desc:
      "'확신' 상태에서 내린 투자 판단이 5영업일 후 실제 시장 결과와 꽤 높은 확률로 일치하고 있습니다.",
  },
  {
    key: 'C',
    title: '기록의 성실도',
    score: 65,
    desc:
      '이번 달 영업일 중 65%의 날짜에 감정을 기록했습니다. 자기 객관화를 위해 더 꾸준한 조각 수집이 필요합니다.',
  },
];

const MindScoreDetailPage = () => {
  const config =
    SCORE_CONFIG.find(
      c => DUMMY_SCORE >= c.min && DUMMY_SCORE <= c.max
    ) ?? SCORE_CONFIG[1];

  return (
    <div className="min-h-screen">
      <Header title="금융 마음 지수" />

      <section className="flex flex-col items-center pt-[77px]">
        <span className="px-[10px] py-[4px] mt-[16px] rounded-full bg-gray-100 text-[14px] font-semibold text-gray-500">
          {config.label}
        </span>

        <div className="mt-[10px] w-full flex justify-center">
          <CircularScore
            score={DUMMY_SCORE}
            color={config.color}
            size={94}
          />
        </div>

        <p className="mt-[17px] px-[15px] py-[11px] bg-gray-50 rounded-full">
          <HighlightText
            text={`“${config.desc}”`}
            highlight={config.highlight}
            className="text-[13px] text-gray-700"
          />
        </p>
        
      </section>

      <MetricSection metrics={DUMMY_METRICS} />

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
