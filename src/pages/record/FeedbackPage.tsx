import React from 'react';
import Gradient from '@/assets/images/gradient.svg';
import { EMOTIONS } from '@/constants/emotions';
import Light from '@/assets/images/light.png';
import Close from '@/assets/icons/close-dark.svg';
import { useNavigate } from 'react-router-dom';

const MOCK_DATA = {
  content:
    '기현님, 삼성전자의 급격한 하락에 크게 {{불안}}하셨군요. 하지만 지난 기록을 보면, 이런 상황에서 감정적으로 매도한 후 [[평균 2일 내]]에 후회하는 패턴이 나타났어요',
  suggestion:
    '지금의 감정은 자연스러워요. 다만, 매도 결정 전 과거의 기록을 한 번 더 살펴보거나, 최소 1시간 후 다시 결정하는 건 어떨까요?',
};

const FeedbackPage = () => {
  const navigate = useNavigate();

  const handleHighlight = (content: string) => {
    const parts = content.split(/(\{\{.*?\}\}|\[\[.*?\]\])/g);

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
      if (part.startsWith('[[') && part.endsWith(']]')) {
        const valueText = part.replace(/\[\[|\]\]/g, '');
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

  return (
    <div className="flex flex-1 flex-col items-center bg-[#F8F9FA] px-4">
      <div className="mb-25 flex h-19 w-full items-center justify-end pt-[25px] pb-[9px]">
        <button onClick={() => navigate(-1)}>
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
          <p>삼성 전자 매수</p>
          <p>·</p>
          <p>불안 Lv.7</p>
        </div>
        <div className="mb-6 text-center leading-6">
          "{handleHighlight(MOCK_DATA.content)}"
        </div>
        <div className="mb-2.5 flex items-center justify-start gap-0.5">
          <img src={Light} alt="전구 이미지" className="h-3.5 w-3.5" />
          <h4 className="bg-[linear-gradient(160deg,#E188FF_0%,#1677FF_100%)] bg-clip-text text-[11px] font-bold text-transparent">
            핀리의 제안
          </h4>
        </div>
        <div className="rounded-xl border-[1.2px] border-gray-50 bg-gray-50/60 p-3">
          <p className="text-[11px] leading-4.5 text-gray-500">
            {MOCK_DATA.suggestion}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
