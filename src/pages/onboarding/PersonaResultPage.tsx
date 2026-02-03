import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@/components/onboarding/Button';
import turtleImg from '@/assets/icons/nametag1.svg';
import deerImg from '@/assets/icons/nametag2.svg';
import eagleImg from '@/assets/icons/nametag3.svg';
import lionImg from '@/assets/icons/nametag4.svg';
import turtleChar from '@/assets/icons/turtle.svg';
import deerChar from '@/assets/icons/deer.svg';
import eagleChar from '@/assets/icons/eagle.svg';
import lionChar from '@/assets/icons/lion.svg';
import shadow from '@/assets/images/shadow.png';
import BackgroundEffect from '@/components/onboarding/BackgroundEffect';
import { useState, useEffect } from 'react';
import { useSignupStore } from '@/store/signupStore';
import { submitPersonaAnswers } from '@/types/personaTest' ;

const PERSONA_ID_MAP: Record<number, string> = {
  1: 'TURTLE',
  2: 'DEER',
  3: 'EAGLE',
  4: 'LION',
};

const PERSONA_UI_DATA: any = {

  TURTLE: {
    nameTag: turtleImg,
    character: turtleChar,
    bgGradient: 'from-[#E1C4FF]/30 to-[#CCEFFF]/90',
    description: '과감한 면이 있으나,\n원칙(안정)이 우선하는 성향이에요!',
    customStyle: 'w-[133px] h-[120px]',
    charPos: 'translate-y-10',
  },
  DEER: {
    nameTag: deerImg,
    character: deerChar,
    bgGradient: 'from-[#E1C4FF]/30 to-[#CCEFFF]/90',
    description:
      '불안이 앞서지만, 신중하게\n판단하려는 마음이 강한 성향이에요!',
    customStyle: 'w-[128px] h-[158px]',
    charPos: 'translate-y-4',
  },
  EAGLE: {
    nameTag: eagleImg,
    character: eagleChar,
    bgGradient: 'from-[#E1C4FF]/30 to-[#CCEFFF]/90',
    description: '빠른 판단을 선호하며,\n기회를 놓치지 않으려는 성향이에요!',
    customStyle: 'w-[128px] h-[146px]',
    charPos: 'translate-y-5',
  },
  LION: {
    nameTag: lionImg,
    character: lionChar,
    bgGradient: 'from-[#E1C4FF]/30 to-[#CCEFFF]/90',
    description:
      '리스크를 감수하더라도,\n성장을 위해 과감히 선택하는 성향이에요!',
    customStyle: 'w-[123px] h-[150px]',
    bgPos: '-translate-y-[12px]',
    charPos: 'translate-y-5',
  },
};

const PersonaResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();


// ✅ 1. 스토어 데이터 가져오기
  const signupData = useSignupStore();
  
  // 상태 관리
  const [isLoading, setIsLoading] = useState(true);
  const [resultType, setResultType] = useState<string | null>(null); 

  useEffect(() => {
    const fetchResult = async () => {
      try {
        console.log("🚀 페르소나 분석 요청 (회원가입X):", signupData.personaAnswers);

        const payload = {
          answers: signupData.personaAnswers
        };

        const res = await submitPersonaAnswers("signup", payload);
        console.log("🔥 서버 전체 응답 확인:", res);

       
        
        const responseData: any = res; // 타입 유연하게 처리
        const serverType = responseData.result?.personaType;
        
        if (serverType) {
          const myType = PERSONA_UI_DATA[serverType] ? serverType : 'TURTLE';
          console.log(`✅ 분석 성공! 결과: ${myType}`);
          setResultType(myType); 
        } else {
           console.warn("응답에 ID가 없습니다. 기본값 사용");
           setResultType('TURTLE');
        }

      } catch (error) {
        console.error("❌ API 에러:", error);
        setResultType('TURTLE'); // 에러 나면 기본값
      } finally {
        setIsLoading(false);
      }
    };

    fetchResult(); 
  }, []); 



  const handleNext = () => {
    navigate('/terms'); 
  };

  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center w-full h-dvh bg-white'>
        <h1 className="text-xl font-bold text-gray-500">나의 투자 성향 분석 중...</h1>
      </div>
    );
  }

  
  const currentUI = PERSONA_UI_DATA[resultType || 'TURTLE'];
  const userNickname = signupData.nickname || "핀리대장";

  return (
    <div className="flex h-full w-full flex-col items-center bg-white px-4">
      {/* 헤더 */}
      <header className="relative mt-[16px] flex h-[60px] w-full shrink-0 items-center">
        <h1 className="text-[18px] font-semibold text-gray-900">
          페르소나 결과
        </h1>
      </header>


      <div className="flex-1 flex flex-col items-center mt-[67px] w-full">
      <div className="flex flex-col items-center ">
      {/* 이름표 */}
      <img 
        src={currentUI.nameTag}
        alt="이름표"
        className="block  mb-[10px] object-contain h-[31px]" 
      />

      {/* 닉네임 */}
      <div className="flex flex-col items-center">
      <h1 className="text-[24px] font-bold text-gray-900 ">
        {userNickname}
      </h1>
      </div>

    </div>

      {/* 캐릭터 */}
      <div className="relative w-[285px] h-[182px] mt-[21px] mb-[67px] flex justify-center items-center">
        <div className="absolute inset-0 flex justify-center items-center z-0">
           <BackgroundEffect />
        </div>

        <div className={`relative z-10 flex flex-col items-center ${currentUI.charPos}`}>

        <img 
          src={currentUI.character} 
          alt="캐릭터" 
          className={`relative  ${currentUI.customStyle}`} 
        />
        <img src={shadow} alt="그림자" className={`mt-[3px]`}/>
      </div>
      </div>
      

      {/*  설명 박스 */}
      <div className={`w-[279px] h-[100px] shrink-0 rounded-[18px] py-[28px] px-[20px] text-center font-medium text-[14px] whitespace-pre-wrap text-gray-600 leading-[22px] 
        bg-gradient-to-b ${currentUI.bgGradient}`}>
        {currentUI.description}
      </div>

        {/*  설명 박스 */}
        <div
          className={`h-[100px] w-[279px] shrink-0 rounded-[18px] bg-gradient-to-b px-[20px] py-[28px] text-center text-[14px] leading-[22px] font-medium whitespace-pre-wrap text-gray-600 ${currentUI.bgGradient}`}
        >
          {resultData.description}
        </div>
      </div>

      {/* 안내 문구 */}
      <div className="mb-8 w-full shrink-0">
        <div className="flex w-full justify-center">
          <p className="font-regular mb-[12px] text-[12px] text-gray-300">
            결과는 마이페이지에서 언제든 다시 볼 수 있어요
          </p>
        </div>

        {/*  다음 버튼  */}
        <div className="w-full">
          <Button
            onClick={() => {
              handleNext();
            }}
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PersonaResultPage;

function setStep(arg0: any) {
  throw new Error('Function not implemented.');
}
function setPersonaAnswers(formattedAnswers: { questionId: number; optionId: unknown; }[]) {
  throw new Error('Function not implemented.');
}

