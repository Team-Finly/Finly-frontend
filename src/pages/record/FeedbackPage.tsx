import React, { useEffect } from 'react';
import Gradient from '@/assets/images/gradient.svg';
import { EMOTIONS, EMOTION_CHART_MAP } from '@/constants/emotions';
import Light from '@/assets/images/light.png';
import Close from '@/assets/icons/close-dark.svg';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useRecordDetail } from '@/hooks/useRecordDetail';
import { stockInfoStore } from '@/store/stockInfoStore';
import { useFeedback } from '@/hooks/useFeedback';

const FeedbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { recordId } = useParams<{ recordId: string }>();
  const { data: feedback, isLoading: isFeedbackLoading } = useFeedback(
    Number(recordId),
  );
  const { data: recordDetail, isLoading: isDetailLoading } = useRecordDetail(
    Number(recordId),
  );
  const stockMap = stockInfoStore((state) => state.stockMap);

  useEffect(() => {
    if (
      !isFeedbackLoading &&
      !isDetailLoading &&
      (!feedback || !recordDetail)
    ) {
      navigate('/record', { replace: true });
    }
  }, [isFeedbackLoading, isDetailLoading, feedback, recordDetail, navigate]);

  if (isFeedbackLoading || isDetailLoading || !feedback || !recordDetail) {
    return null;
  }

  const stockName = recordDetail?.symbol
    ? (stockMap[recordDetail.symbol]?.name ?? recordDetail.symbol)
    : '';

  const tradeAction = recordDetail?.tradeAction;
  const emotionLabel = recordDetail?.emotionCode
    ? EMOTION_CHART_MAP[recordDetail.emotionCode]?.label
    : '';

  const handleHighlight = (content: string) => {
    const parts = content.split(/(\{\{.*?\}\}|<<.*?>>)/g);

    return parts.map((part, index) => {
      // 감정 키워드
      if (part.startsWith('{{') && part.endsWith('}}')) {
        const emotionLabel = part.replace(/\{\{|\}\}/g, '');
        const emotionData = EMOTIONS.find((e) => e.label === emotionLabel);
        const highlightColor = emotionData?.color || 'inherit';

        return (
          <span
            key={index}
            style={{ color: highlightColor }}
            className="font-bold"
          >
            {emotionLabel}
          </span>
        );
      }

      // 수치 데이터
      if (part.startsWith('<<') && part.endsWith('>>')) {
        const valueText = part.replace(/<<|>>/g, '');
        return (
          <span key={index} className="text-secondary font-bold">
            {valueText}
          </span>
        );
      }

      // 일반 텍스트
      return (
        <span key={index} className="font-semibold">
          {part}
        </span>
      );
    });
  };

  const handleBoldText = (text: string) => {
    const parts = text.split(/(\{\{.*?\}\})/g);

    return parts.map((part, index) => {
      if (part.startsWith('{{') && part.endsWith('}}')) {
        const keyword = part.replace(/\{\{|\}\}/g, '');
        return (
          <strong key={index} className="font-bold">
            {keyword}
          </strong>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  const handleClose = () => {
    if (location.state?.fromLoading) {
      navigate('/record');
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center bg-[#F8F9FA] px-4">
      <div className="mb-20 flex h-19 w-full items-center justify-end pt-[25px] pb-[9px]">
        <button onClick={handleClose}>
          <img src={Close} alt="닫기 아이콘" className="cursor-pointer" />
        </button>
      </div>
      <div className="relative mb-5 flex items-center justify-center">
        <img src={Gradient} alt="배경" className="w-[115px]" />
        <span className="absolute text-xs font-bold text-white">
          오늘의 Finly Talk
        </span>
      </div>
      <div className="w-[339px] rounded-[20px] bg-[#ffffff]/60 p-6 shadow-[0px_3px_10px_0px_rgba(191,195,209,0.2)]">
        <div className="mb-6 flex justify-center gap-1 text-[13px] font-semibold text-gray-500/80">
          <p>
            {stockName}{' '}
            {tradeAction === 'BUY'
              ? '매수'
              : tradeAction === 'SELL'
                ? '매도'
                : tradeAction === 'WATCH'
                  ? '관망'
                  : ''}
          </p>
          <p>·</p>
          <p>
            {emotionLabel} Lv.{recordDetail?.emotionIntensity}
          </p>
        </div>
        <div className="mb-6 text-center leading-6">
          "{handleHighlight(feedback.content)}"
        </div>
        <div className="mb-2.5 flex items-center justify-start gap-0.5">
          <img src={Light} alt="전구 이미지" className="h-3.5 w-3.5" />
          <h4 className="bg-[linear-gradient(160deg,#E188FF_0%,#1677FF_100%)] bg-clip-text text-[11px] font-bold text-transparent">
            핀리의 제안
          </h4>
        </div>
        <div className="rounded-xl border-[1.2px] border-gray-50 bg-gray-50/60 p-3">
          <p className="text-[11px] leading-4.5 text-gray-500">
            {handleBoldText(feedback.suggestion)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
