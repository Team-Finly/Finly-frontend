import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignupStore } from '../../store/signupStore'; 
import { authApi } from '../../types/auth'; 
import logo from '../../assets/icons/icon.svg';
import text from '../../assets/icons/finly.svg' 

const OnboardingStart = () => {
  const navigate = useNavigate();
  const signupData = useSignupStore();
const handleSignupSubmit = async () => {
    try {
      // 1. 서버 전송용 데이터
      const payload = {
        email: signupData.email,
        password: signupData.password,
        nickname: signupData.nickname,
        termAgreements: signupData.termAgreements,
        personaAnswers: signupData.personaAnswers,
      };

      console.log("🚀 회원가입 최종 요청 데이터:", payload);

      // 2. API 호출
      const res = await authApi.signup(payload);

      if (res.isSuccess) {
        alert("회원가입에 성공했습니다!");
        
        
        signupData.reset();
        navigate('/login'); 
      }
    } catch (error: any) {
      console.error("❌ 회원가입 실패:", error);
      
      alert(error.response?.data?.message || "회원가입 중 오류가 발생했습니다.");
    }
  };
  return (
    
    <div className="relative flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-white px-5 pb-[52px]">
      
      {/* 배경의 은은한 분홍빛 효과 (디자인 참고) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#FFF5F6] via-white to-white opacity-60" />

      {/* 2. 중앙 로고 및 텍스트 영역 */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
        {/* 로고 이미지 자리 */}
        <div className="mb-6 flex items-center gap-3">
          {/* 이미지는 직접 삽입하신다고 하셔서 img 태그로 비워두었습니다. */}
          <img src={logo} alt="Finly Logo" className="h-12 w-auto" />
          <img src={text} alt="Finly Text" className="h-12 w-auto" />
        </div>

        {/* 슬로건 텍스트 */}
        <p className="text-[16px] font-medium text-gray-300">
          후회 없는 투자를 위한 감정 아카이빙 서비스
        </p>
      </div>

      {/* 3. 하단 버튼 영역 */}
      <div className="relative z-10 w-full">
        <button
          onClick={handleSignupSubmit} 
          className="h-[56px] w-full rounded-[16px] bg-[#5B86F1] text-[18px] font-bold text-white transition-all active:scale-[0.98] active:bg-[#4A74E0]"
        >
          지금 시작하기
        </button>
      </div>
    </div>
  );
};

export default OnboardingStart;