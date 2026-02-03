import TitleImg from '@/assets/images/finly_talk.png';
import FeedbackBtn from '@/assets/icons/go_feedback.svg';
import { useNavigate } from 'react-router-dom';

const FinlyTalk = () => {
  const navigate = useNavigate();
  const handleGoFeedback = () => {
    // 연동 시 로직 추가 예정
    navigate('/feedback');
  };
  return (
    <div className="flex w-full flex-col px-4 pt-7">
      <div className="rounded-xl border-[1.2px] border-gray-100 bg-gray-50/60 p-4.5">
        <div className="flex flex-row items-center justify-between">
          <img src={TitleImg} alt="Finly Talk" className="h-6.25" />
          <img
            src={FeedbackBtn}
            alt="피드백 상세 보기"
            className="h-2.75 cursor-pointer"
            onClick={handleGoFeedback}
          />
        </div>
        <div className="mt-3 text-[13px] text-gray-700/80">
          기현님, 삼성전자의 급격한 하락에 크게 <strong>불안</strong>하셨군요.
          하지만 지난 기록을 보면, 이런 상황에서 감정적으로 매도한 후 평균
          <strong> 2일 내</strong>에 후회하는 패턴이 나타났어요.
        </div>
      </div>
    </div>
  );
};

export default FinlyTalk;
