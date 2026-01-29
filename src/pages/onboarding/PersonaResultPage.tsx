import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/onboarding/Button';
import turtleImg from '../../assets/icons/nametag1.svg';
import deerImg from '../../assets/icons/nametag2.svg';
import eagleImg from '../../assets/icons/nametag3.svg';
import lionImg from '../../assets/icons/nametag4.svg';
import turtleChar from '../../assets/icons/turtle.svg';
import deerChar from '../../assets/icons/deer.svg';
import eagleChar from '../../assets/icons/eagle.svg';
import lionChar from '../../assets/icons/lion.svg';
import shadow from '../../assets/images/shadow.png';
import closeIcon from '../../assets/icons/close.svg'
import BackgroundEffect from '../../components/onboarding/BackgroundEffect';


const PERSONA_UI_DATA = {
  TURTLE: {
    nameTag: turtleImg,
    character: turtleChar,
    bgGradient: 'from-[#E1C4FF]/30 to-[#CCEFFF]/90',
    description: "과감한 면이 있으나,\n원칙(안정)이 우선하는 성향이에요!",
    customStyle: 'w-[133px] h-[120px] mt-[54px]', 
  },
  DEER: {
    nameTag: deerImg,
    character: deerChar,
    bgGradient: 'from-[#E1C4FF]/30 to-[#CCEFFF]/90',
    description: "불안이 앞서지만, 신중하게\n판단하려는 마음이 강한 성향이에요!",
    customStyle: 'w-[128px] h-[158px] mt-[15px]',
  },
  EAGLE: {
    nameTag: eagleImg,
    character: eagleChar,
    bgGradient: 'from-[#E1C4FF]/30 to-[#CCEFFF]/90',
    description: "빠른 판단을 선호하며,\n기회를 놓치지 않으려는 성향이에요!",
    customStyle: 'w-[128px] h-[146px] mt-[30px]', 
  },
  LION: {
    nameTag: lionImg,
    character: lionChar,
    bgGradient: 'from-[#E1C4FF]/30 to-[#CCEFFF]/90',
    description: "리스크를 감수하더라도,\n성장을 위해 과감히 선택하는 성향이에요!",
    customStyle: 'w-[123px] h-[150px] mt-[27px]',
  },
};

  const PersonaResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const TEST_TYPE = "EAGLE"; 
  const currentUI = PERSONA_UI_DATA[TEST_TYPE];
  const resultData = location.state?.result || {
    userNickname: "핀리대장",
    description: currentUI.description, 
  };

  const handleNext = () => {
    navigate('/terms');
  };

  return (
    <div className='flex flex-col items-center w-full px-4 mt-[16px] bg-white'>

      {/* 헤더 */}
      <header className="relative flex items-center shrink-0 w-full h-[60px]">
        <h1 className="text-[18px] font-semibold text-gray-900">페르소나 결과</h1>
      </header>
      
      {/* 이름표 */}
      <img 
        src={currentUI.nameTag} 
        alt="이름표"
        className="block mt-[67px] mb-[10px] object-contain h-[31px]" 
      />

      {/* 닉네임 */}
      <h1 className="text-[24px] font-bold text-gray-900 mb-[21px]">
        {resultData.userNickname}
      </h1>

      {/* 캐릭터 */}
      <div className="relative flex flex-col justify-center items-center w-full ">
        <div className="absolute top-0 flex justify-center items-center z-0">
           <BackgroundEffect />
        </div>
        <img 
          src={currentUI.character} 
          alt="캐릭터" 
          className={`relative  ${currentUI.customStyle} mb-[2px]`} 
        />
        <img src={shadow} alt="그림자" />
      </div>

      {/*  설명 박스 */}
      <div className={`w-[279px] h-[100px] rounded-[18px] mt-[52px] py-[28px] px-[20px] text-center font-medium text-[14px] whitespace-pre-wrap text-gray-600 leading-[22px]
        bg-gradient-to-b ${currentUI.bgGradient}`}>
        {resultData.description}
      </div>

      {/* 안내 문구 */}
      <div>
        <p className='text-[12px] font-regular text-gray-300 mt-[103px] mb-[12px]'>결과는 마이페이지에서 언제든 다시 볼 수 있어요</p>
      </div>

      {/*  다음 버튼  */}
      <div className="w-full">
        <Button onClick={() => { handleNext(); }} >
          다음
        </Button>
      </div>

    </div>
  );
};

export default PersonaResultPage;