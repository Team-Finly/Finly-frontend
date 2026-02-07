import React, { useEffect, useRef, useState } from 'react';
import Robot from '@/assets/icons/robot.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFeedback } from '@/hooks/useFeedback';

const LoadingPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const recordId = state?.recordId;
  const { data: feedback } = useFeedback(recordId);

  const [textIndex, setTextIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMinTimeOver, setIsMinTimeOver] = useState(false);

  const messages = [
    {
      main1: '작성하신 기록을',
      main2: '꼼꼼히 살피고 있어요',
      sub1: '데이터를 정리하며',
      sub2: '분석을 준비하고 있어요.',
      desc: '분석 준비 중...',
    },
    {
      main1: '과거의 투자 패턴과',
      main2: '비교해 분석하고 있어요',
      sub1: '비슷한 상황에서 어떤 결과가 있었는지',
      sub2: '핀리가 확인하고 있어요.',
      desc: 'AI 리포트 생성 중...',
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMinTimeOver(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isMinTimeOver && feedback?.status === 'COMPLETED') {
      setProgress(100);
      const navigateTimer = setTimeout(() => {
        navigate(`/feedback/${recordId}`);
      }, 500);
      return () => clearTimeout(navigateTimer);
    }
  }, [isMinTimeOver, feedback, navigate, recordId]);

  const innerTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => (prev < 99 ? prev + 1 : prev));
    }, 50);

    const messageTimer = setInterval(() => {
      setIsExiting(true);
      innerTimeoutRef.current = setTimeout(() => {
        setTextIndex((prev) => (prev === 0 ? 1 : 0));
        setIsExiting(false);
      }, 500);
    }, 2500);

    return () => {
      clearInterval(progressTimer);
      clearInterval(messageTimer);
      clearTimeout(innerTimeoutRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center px-[30px] pt-40">
      <style>{`
        @keyframes custom-pulse {
          0%, 100% { box-shadow: 0px 0px 20px 0px rgba(39, 141, 253, 0.3); }
          50% { box-shadow: 0px 0px 40px 0px rgba(39, 141, 253, 0.3); }
        }
        .animate-custom-pulse {
          animation: custom-pulse 1s ease-in-out infinite;
        }
      `}</style>
      <div className="animate-custom-pulse flex h-[110px] w-[110px] items-center justify-center rounded-full bg-white">
        <img src={Robot} alt="로봇 아이콘" />
      </div>
      <div
        className={`${isExiting ? 'opacity-0' : 'opacity-100'} transition-opacity`}
      >
        <div className="mt-15 flex flex-col items-center text-lg leading-6 font-semibold">
          <p>{messages[textIndex].main1}</p>
          <p>{messages[textIndex].main2}</p>
        </div>
        <div className="mt-4 flex flex-col items-center text-sm leading-4.5 text-gray-500">
          <p>{messages[textIndex].sub1}</p>
          <p>{messages[textIndex].sub2}</p>
        </div>
      </div>
      <div className="mt-15 w-full">
        <div className="mx-auto mb-3 h-2 max-w-[333px] rounded-[14.5px] bg-gray-100">
          <div
            className="bg-secondary h-2 rounded-[14.5px] transition-all duration-50 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="mx-auto flex max-w-[333px] items-center justify-between">
          <p className="text-secondary text-xs font-bold">
            {messages[textIndex].desc}
          </p>
          <p className="text-xs text-gray-300">{progress}%</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
