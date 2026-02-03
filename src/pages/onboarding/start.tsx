import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignupStore } from '@/store/signupStore'; 
import { authApi } from '@/types/auth'; 
import logo from '@/assets/icons/icon.svg';
import text from '@/assets/icons/finly.svg' 

const OnboardingStart = () => {
const navigate = useNavigate();
const signupData = useSignupStore();
const [isSubmitting, setIsSubmitting] = React.useState(false);

const handleSignupSubmit = async () => {
    try {
        setIsSubmitting(true);
      // 1. 서버 전송용 데이터
      const payload = {
        email: signupData.email,
        password: signupData.password,
        nickname: signupData.nickname,
        termAgreements: signupData.termAgreements,
        personaAnswers: signupData.personaAnswers,
      };

      console.log("🚀 회원가입 최종 요청 데이터:", payload);

      const res = await authApi.signup(payload);

      if (res.isSuccess) {
        alert("회원가입에 성공했습니다!");
        signupData.reset();
        navigate('/login'); 
      }
    } catch (error: any) {
      console.error("회원가입 실패:", error);
      setIsSubmitting(false);
      alert(error.response?.data?.message || "회원가입 중 오류가 발생했습니다.");
    }
  };
  return (
    
    <div className="bg-blue-bg flex flex-1 flex-col items-center pt-54">
      <div className="flex items-start gap-[19px]">
        <img src={logo} alt="핀리 로고 이미지" />
        <img src={text} alt="핀리 텍스트 로고 이미지" />
      </div>
      <p className="mt-4.5 text-sm text-gray-300">
        후회 없는 투자를 위한 감정 아카이빙 서비스
      </p>
      <div className="fixed bottom-0 w-full max-w-120 bg-gradient-to-b from-[rgba(255,255,255,0.07)] via-[rgba(255,255,255,1)_36%] to-white px-4 pt-10">
        <button
          className="bg-secondary mb-[119px] h-[50px] w-full cursor-pointer rounded-xl text-lg leading-[26px] font-bold text-white"
          onClick={handleSignupSubmit}   
          disabled={isSubmitting}
        >
          {isSubmitting ? '처리 중...' : '지금 시작하기'}
        </button>
        <>
        </>
      </div>
    </div>
  );
}

export default OnboardingStart;