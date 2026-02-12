import React from 'react';
import Logo from '@/assets/icons/logo.svg';
import Finly from '@/assets/images/finly.svg';
import { useNavigate } from 'react-router-dom';

const OnboardingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-bg flex flex-1 flex-col items-center pt-54">
      <div className="flex items-start gap-[19px]">
        <img src={Logo} alt="핀리 로고 이미지" className="h-12.5 w-12.5" />
        <img src={Finly} alt="핀리 텍스트 로고 이미지" />
      </div>
      <p className="mt-4.5 text-sm text-gray-300">
        후회 없는 투자를 위한 감정 아카이빙 서비스
      </p>
      <div className="fixed bottom-0 w-full max-w-120 bg-gradient-to-b from-[rgba(255,255,255,0.07)] via-[rgba(255,255,255,1)_36%] to-white px-4 pt-10">
        <button
          className="bg-secondary mb-[34px] h-[50px] w-full cursor-pointer rounded-xl text-lg leading-[26px] font-bold text-white"
          onClick={() => navigate('/signup')}
        >
          지금 시작하기
        </button>
        <div className="mb-[59px] flex items-center justify-center gap-2.5 text-sm leading-6.5">
          <p className="font-normal">이미 계정이 있으신가요?</p>
          <button
            className="text-primary cursor-pointer"
            onClick={() => navigate('/login')}
          >
            로그인하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
