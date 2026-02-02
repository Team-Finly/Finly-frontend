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
      <>
    <span className="text-gray-500 font-medium whitespace-nowrap block">
      충분히 고민했어요. 이제는 <span className="text-secondary font-semibold">기준을 정하고</span> 한 번 움직여보세요.
    </span>
    <span className="text-gray-500 font-medium whitespace-nowrap block">
      모든 선택을 확신할 수는 없기에, 기록하며 <span className="text-secondary font-semibold">조정</span>하면 돼요.
    </span>
    <span className="text-gray-500 font-medium whitespace-nowrap block">
      핀리는 망설임이 길어질 때 행동 타이밍을 알려줄게요!
    </span>
    </>
    ),
  },
  DEER: {
    name: "걱정 많은 사슴",
    subDesc: <>불안이 앞서지만, 신중하게<br/>판단하려는 마음이 강한 성향이에요</>,
    image: deer,
    bgImage: deerbg,
    bgStyle: "w-[150px] h-[150px]", 
    advice: (
      <>
    <span className="text-gray-500 font-medium">불안할수록 감정만 보지 말고, </span>
    <span className="text-secondary font-semibold">기록된 사실</span>
    <span className="text-gray-500 font-medium">을 함께 보세요.</span>
    <br />
    <span className="text-gray-500 font-medium">감정이 판단을 대신하게 두지 마세요. 숫자는 늘 솔직해요.</span>
    <br />
    <span className="text-gray-500 font-medium">핀리는 불안이 커질 때, 지금 </span>
    <span className="text-secondary font-semibold">멈춰야 할지 아닌지</span>
    <span className="text-gray-500 font-medium"> 정리해줄게요!</span>
  </>
    )
  },
  EAGLE: {
    name: "날카로운 독수리",
    subDesc: <>빠른 판단을 선호하며,<br/>기회를 놓치지 않으려는 성향이에요</>,
    image: eagle,
    bgImage: eaglebg,
    
    bgStyle: "w-[150px] h-[150px]", 
    advice: (
      <>
    <span className="text-gray-500 font-medium">빠른 판단은 강점이지만, </span>
    <span className="text-secondary font-semibold">이유 없는 확신</span>
    <span className="text-gray-500 font-medium">은 위험해요.</span>
    <br />
    <span className="text-gray-500 font-medium">결정 전 한 번만 감정 기록을 확인하는 습관을 가져보세요.</span>
    <br />
    <span className="text-gray-500 font-medium">핀리는 당신의 선택이 </span>
    <span className="text-secondary font-semibold">충동인지 전략인지</span>
    <span className="text-gray-500 font-medium"> 구분해줄게요!</span>
  </>
    )
  },
  LION: {
    name: "불타는 사자",
    subDesc: <>리스크를 감수하더라도,<br/>성장을 위해 과감히 선택하는 성향이에요</>,
    image: lion,
    bgImage: lionbg,
    
    bgStyle: "w-[150px] h-[150px]", 
    advice: (
      <>
    <span className="text-gray-500 font-medium">과감함은 좋지만, 모든 판에 전력을 다할 필요는 없어요.</span>
    <br />
    <span className="text-gray-500 font-medium">확신이 강할수록 </span>
    <span className="text-secondary font-semibold">손실 기준</span>
    <span className="text-gray-500 font-medium">을 먼저 정해두세요.</span>
    <br />
    <span className="text-gray-500 font-medium">핀리는 큰 승부 전에 </span>
    <span className="text-secondary font-semibold">리스크</span>
    <span className="text-gray-500 font-medium">부터 점검해줄게요!</span>
  </>
      
    )
  },
};

const MyPersona = () => {
  const navigate = useNavigate();

//테스트
  const mockPersonaType = 'DEER'; // TURTLE, DEER, EAGLE, LION 중 하나로 변경해가며 테스트 가능
  const data = PERSONA_DATA[mockPersonaType] || PERSONA_DATA.TURTLE;

  return (
    <> 
      <div className="relative z-50 bg-white">
        <TitleHeader title="나의 페르소나" />
      </div>
      <main className="flex-1 overflow-y-auto scrollbar-hide pb-[60px]">
      <div className="w-full flex flex-col items-center justify-center mt-[110px] ">
        
        {/* 캐릭터 + 배경 그룹 */}
        <div className="relative w-[77px] h-[70px] flex items-center justify-center mt-[42px] mb-[31px]">
          <img 
            src={data.bgImage} 
            alt="배경" 
            className={`-mt-[10px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-none z-0 object-cover ${data.bgStyle}`} 
          />
          <img 
            src={data.image}
            alt={data.name}
            className="relative z-10 w-[77px] h-[70px] object-contain mb-[14px]"
          />
        </div>
        
          <div className="flex flex-col px-[30px] w-full"> 
            <div className="text-center mb-[40px]">
              <h2 className="text-[20px] font-bold text-gray-900 mb-[14px]">{data.name}</h2>
              <p className="text-[12px] font-regular text-gray-500/40 whitespace-pre-wrap leading-[18px]">
                  {data.subDesc}
              </p>
            </div>
            
            <div className="w-full flex flex-col items-start"> 
              <div className='flex flex-row items-center gap-[4px] mb-[16px]'> 
                <img src={light} alt="핀리의 조언 아이콘" className="w-[16px] h-[16px]" />
                <p className="font-semibold text-[14px] bg-clip-text text-transparent w-fit"
                    style={{ backgroundImage: "linear-gradient(121deg, #E188FF 14.24%, #1677FF 96.82%)" }}>
                    핀리의 조언
                </p>
              </div>
            </div>

            {/* 이동: 회색 박스를 px-[30px]를 가진 부모 div 안으로 옮겼습니다 */}
            <div className="w-full min-h-[114px] bg-[#F7F8FA] rounded-[20px] py-[24px] px-[12px] flex flex-col justify-center">
            <div className="w-full text-center text-[#505050] font-medium leading-[22px] tracking-[-0.5px] text-[12px]">
              {data.advice}
              </div>

          </div>
          </div> {/* px-[30px]를 가진 div 끝 */}
          
        </div>
        
        <div className="w-full px-[16px] mt-[125px]">
          <button className="w-full py-[12px] h-[50px] bg-secondary text-white rounded-[12px]  leading-[26px] mb-[12px] font-semibold text-[18px]">
            이미지로 저장하기
          </button>
          <button className="w-full h-[50px] py-[12px] bg-gray-50 text-gray-500 rounded-[12px] leading-[26px]  font-semibold text-[18px]">
            테스트 다시하기
          </button>
        </div>
      </main>
    </> 
  );
};

export default MyPersona;