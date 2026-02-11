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
import { submitPersonaAnswers } from '@/apis/personatestApi';
import { useUserStore } from '../../store/userStore';

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
  const signupData = useSignupStore();
  const nickname = useUserStore((state) => state.nickname);
  const [isLoading, setIsLoading] = useState(true);
  const [resultType, setResultType] = useState<string | null>(null);

  const isRetest = location.state?.from === 'mypage';
  const userNickname = isRetest
    ? nickname || '핀리대장'
    : signupData.nickname || '핀리대장';

  const currentUI =
    PERSONA_UI_DATA[resultType ?? ''] ?? PERSONA_UI_DATA['TURTLE'];

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const payload = {
          answers: signupData.personaAnswers,
        };
        const modeParam = isRetest ? 'retest' : 'signup';
        const res = await submitPersonaAnswers(modeParam, payload);
        if (res.isSuccess && res.result && res.result.personaType) {
          setResultType(res.result.personaType);
        } else {
          setResultType('TURTLE');
        }
      } catch (error) {
        setResultType('TURTLE');
      } finally {
        setIsLoading(false);
      }
    };
    fetchResult();
  }, [isRetest, signupData.personaAnswers]);

  const handleNext = () => {
    if (isRetest) {
      navigate('/mypersona');
    } else {
      navigate('/terms')
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-white">
        <h1 className="text-xl font-bold text-gray-500">
          나의 투자 성향 분석 중...
        </h1>
      </div>
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center bg-white px-4">
      {/* 헤더 */}
      <header className="relative mt-[16px] flex h-[60px] w-full shrink-0 items-center">
        <h1 className="text-[18px] font-semibold text-gray-900">
          페르소나 결과
        </h1>
      </header>

      <div className="mt-[67px] flex w-full flex-1 flex-col items-center">
        <div className="flex flex-col items-center">
          {/* 이름표 */}
          <img
            src={currentUI.nameTag}
            alt="이름표"
            className="mb-[10px] block h-[31px] object-contain"
          />

          {/* 닉네임 */}
          <div className="flex flex-col items-center">
            <h1 className="text-[24px] font-bold text-gray-900">
              {userNickname}
            </h1>
          </div>
        </div>

        {/* 캐릭터 */}
        <div className="relative mt-[21px] mb-[67px] flex h-[182px] w-[285px] items-center justify-center">
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <BackgroundEffect />
          </div>

          <div
            className={`relative z-10 flex flex-col items-center ${currentUI.charPos}`}
          >
            <img
              src={currentUI.character}
              alt="캐릭터"
              className={`relative ${currentUI.customStyle}`}
            />
            <img src={shadow} alt="그림자" className={`mt-[3px]`} />
          </div>
        </div>

        {/*  설명 박스 */}
        <div
          className={`h-[100px] w-[279px] shrink-0 rounded-[18px] bg-gradient-to-b px-[20px] py-[28px] text-center text-[14px] leading-[22px] font-medium whitespace-pre-wrap text-gray-600 ${currentUI.bgGradient}`}
        >
          {currentUI.description}
        </div>
      </div>

      {/* 안내 문구 */}
      <div className="mb-13 w-full shrink-0">
        <div className="flex w-full justify-center">
          <p className="font-regular mb-[12px] text-[12px] text-gray-300">
            결과는 마이페이지에서 언제든 다시 볼 수 있어요
          </p>
        </div>

        {/*  다음 버튼  */}
        <div className="w-full">
          <Button onClick={handleNext}>{isRetest ? '저장' : '다음'}</Button>
        </div>
      </div>
    </div>
  );
};

export default PersonaResultPage;
