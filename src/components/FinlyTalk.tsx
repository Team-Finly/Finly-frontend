import TitleImg from '@/assets/images/finly_talk.png';
import FeedbackBtn from '@/assets/icons/go_feedback.svg';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

interface FinlyTalkProps {
  recordId: number;
  content?: string;
  status?: 'PENDING' | 'COMPLETED' | 'FAILED';
}

const FinlyTalk = ({ recordId, content, status }: FinlyTalkProps) => {
  const navigate = useNavigate();

  const formattedContent = useMemo(() => {
    if (!content) return "";
 
    const pattern = /<<(.+?)>>|\{\{(.+?)\}\}/g;

    return content.replace(pattern, (_, p1, p2) => {
      const target = p1 || p2;
      return `<strong class="font-bold text-gray-700/80">${target}</strong>`;
    });
  }, [content]);

  const handleGoFeedback = () => {
    navigate(`/feedback/${recordId}`);
  };
  
  return (
    <div className="flex w-full flex-col px-4 pt-7">
      <div className="rounded-xl border-[1.2px] border-gray-100 bg-gray-50/60 p-4.5">
        <div className="flex flex-row items-center justify-between">
          <img src={TitleImg} alt="Finly Talk" className="h-6.25" />
          {status === 'COMPLETED' && (
            <img
              src={FeedbackBtn}
              alt="피드백 상세 보기"
              className="h-2.75 cursor-pointer"
              onClick={handleGoFeedback}
            />
          )}
        </div>
        <div className="mt-3 text-[13px] text-gray-700/80">
          {status === 'PENDING' ? (
            <div className="flex items-center gap-2 italic text-gray-400">
              <span className="animate-pulse">Finly가 매매 기록을 분석하고 있어요...</span>
            </div>
          ) : (
            <p 
              className="whitespace-pre-wrap" 
              dangerouslySetInnerHTML={{ __html: formattedContent || "분석된 피드백이 없습니다." }} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FinlyTalk;