import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TitleHeader from '../../components/record/TitleHeader';

// 이미지 import
import turtle from '../../assets/icons/turtle.svg';
import turtlebg from '../../assets/icons/turtlebg.svg';
import deer from '../../assets/icons/deer.svg';
import deerbg from '../../assets/icons/deerbg.svg';
import eagle from '../../assets/icons/eagle.svg';
import eaglebg from '../../assets/icons/eaglebg.svg';
import lion from '../../assets/icons/lion.svg';
import lionbg from '../../assets/icons/lionbg.svg';
import light from '../../assets/icons/light.svg'
const PERSONA_DATA = {
  TURTLE: {
    name: "신중한 거북이",
    subDesc: <>과감한 면이 있으나,<br/>원칙(안정)이 우선하는 성향이에요</>,
    image: turtle,  
    bgImage: turtlebg, 
    bgStyle: "w-[150px] h-[150px]", 
    advice: (
        <div className="text-[#505050] leading-[22px] tracking-[-0.5px] font-medium"
         style={{ fontSize: "clamp(12.5px, 3.8vw, 13px)" }}>
        
       
        <span className="whitespace-nowrap block">
          충분히 고민했어요. 이제는 <span className="text-[#5B88F8] font-bold">기준을 정하고</span> 한 번 움직여보세요.
        </span>
        <span className="whitespace-nowrap block">
          모든 선택을 확신할 수는 없기에, 기록하며 <span className="text-[#5B88F8] font-bold">조정</span>하면 돼요.
        </span>
        <span className="whitespace-nowrap block">
          핀리는 망설임이 길어질 때 행동 타이밍을 알려줄게요!
        </span>
    </div>
      
    )
  },
  DEER: {
    name: "걱정 많은 사슴",
    subDesc: <>불안이 앞서지만, 신중하게<br/>판단하려는 마음이 강한 성향이에요</>,
    image: deer,
    bgImage: deerbg,
    bgStyle: "w-[160px] h-[160px] translate-y-1", 
    advice: (
      <div className=' white-space-pre-wrap'>
        불안할수록 감정만 보지 말고, <span className="text-[#5B88F8] font-bold">기록된 사실</span>을 함께 보세요.
        감정이 판단을 대신하게 두지 마세요. 숫자는 늘 솔직해요.
        핀리는 불안이 커질 때, 지금 <span className="text-[#5B88F8] font-bold">멈춰야 할지 아닌지</span> 정리해줄게요!
      </div>
    )
  },
  EAGLE: {
    name: "날카로운 독수리",
    subDesc: <>빠른 판단을 선호하며,<br/>기회를 놓치지 않으려는 성향이에요</>,
    image: eagle,
    bgImage: eaglebg,
    
    bgStyle: "w-[140px] h-[140px] -translate-y-2", 
    advice: (
      <div className=' white-space-pre-wrap'>
        빠른 판단은 강점이지만, <span className="text-[#5B88F8] font-bold">이유 없는 확신</span>은 위험해요.
        결정 전 한 번만 감정 기록을 확인하는 습관을 가져보세요.
        핀리는 당신의 선택이 <span className="text-[#5B88F8] font-bold">충동인지 전략인지</span> 구분해줄게요!
      </div>
    )
  },
  LION: {
    name: "불타는 사자",
    subDesc: <>리스크를 감수하더라도,<br/>성장을 위해 과감히 선택하는 성향이에요</>,
    image: lion,
    bgImage: lionbg,
    
    bgStyle: "w-[155px] h-[155px]", 
    advice: (
      <div className=' white-space-pre-wrap'>
        과감함은 좋지만, 모든 판에 전력을 다할 필요는 없어요.
        확신이 강할수록 <span className="text-[#5B88F8] font-bold">손실 기준</span>을 먼저 정해두세요.
        핀리는 큰 승부 전에 <span className="text-[#5B88F8] font-bold">리스크</span>부터 점검해줄게요!
      </div>
    )
  },
};

const MyPersona = () => {
  const navigate = useNavigate();

//테스트
  const mockPersonaType = 'TURTLE'; 
  const data = PERSONA_DATA[mockPersonaType] || PERSONA_DATA.TURTLE;

  return (
    <> 
      <TitleHeader title="나의 페르소나" />
      <div className="w-full flex flex-col items-center justify-center mt-[120px] px-[30px]">
        
        {/* 캐릭터 + 배경 그룹 */}
        <div className="relative w-[77px] h-[70px] flex items-center justify-center mt-[42px] mb-[51px]">
          <img 
            src={data.bgImage} 
            alt="배경" 
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-none z-0 object-cover ${data.bgStyle}`} 
          />
          <img 
            src={data.image}
            alt={data.name}
            className="relative z-10 w-[77px] h-[70px] object-contain mb-[14px]"
          />
        </div>

        <div className="text-center mb-[40px]">
            <h2 className="text-[20px] font-bold text-gray-900 mb-[14px]">{data.name}</h2>
            <p className="text-[12px] text-gray-400 whitespace-pre-wrap leading-[18px]">
                {data.subDesc}
            </p>
        </div>
        <div className="w-full flex flex-col items-start "> 
          
          <div className='flex flex-row items-center gap-[4px] mb-[16px] '> 
              <img src={light} alt="핀리의 조언 아이콘" className="w-[18px] h-[18px]" />
              <p className="font-bold text-[15px] bg-clip-text text-transparent w-fit"
                  style={{ backgroundImage: "linear-gradient(121deg, #E188FF 14.24%, #1677FF 96.82%)" }}>
                  핀리의 조언
              </p>
          </div>
    
        </div>
        <div className=" w-full h-[114px] bg-[#F7F8FA] rounded-[20px] py-[24px] px-[12px] flex flex-col items-center justify-center text-center">
              <div className="text-[13px] font-medium leading-[22px] text-[#505050] tracking-[-0.5px] "
              style={{ 
           
           fontSize: "clamp(13px, 3.8vw, 15px)" 
         }}>
                  {data.advice}
                  </div>
          </div>
          <div className="w-full mt-[40px] flex flex-col gap-3">
        </div>
  
        </div>

        <button className="w-full h-[52px] bg-[#5B88F8] text-white rounded-[12px] font-bold text-[16px]">
      이미지로 저장하기
    </button>
    <button className="w-full h-[52px] bg-[#F3F4F6] text-[#767676] rounded-[12px] font-medium text-[16px]">
      테스트 다시하기
    </button>
    </> 
  );
};

export default MyPersona;