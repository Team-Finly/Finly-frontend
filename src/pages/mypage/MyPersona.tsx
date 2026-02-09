import { PERSONA_DATA, type PersonaKey } from '@/constants/mypersona';
import light from '@/assets/icons/light.svg'
import { useEffect, useState } from 'react';
import { getMyPersona } from '@/apis/userApi';
import { useUserStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';
import { useSignupStore } from '@/store/signupStore';
import Before from "@/assets/icons/before.svg";

const MyPersona = () => {
  const personaType = useUserStore((state) => state.personaType);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const resetSignupStore = useSignupStore((state) => state.reset);
  useEffect(() => {
    const fetchPersona = async () => {
      try {
        setIsLoading(true); 
        const result = await getMyPersona(); 
        if (result && result.personaType) {
          setUserInfo({ personaType: result.personaType });
        }
      } catch (error) {
        console.error("페르소나 조회 실패:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchPersona();
  }, [setUserInfo, personaType]);

  if (isLoading) {
    return <div className="h-screen bg-white" />;
  }

  if (!personaType) {
    return <div className="h-screen bg-white" />;
  }

 const data = PERSONA_DATA[personaType as PersonaKey];
  if (!data) {
    return <div className="h-screen bg-white" />;
  }
  const handleRetest = () => {
    resetSignupStore();
    navigate('/persona', { state: { from: 'mypage' } });
  };


  return (
    <div className="flex flex-col h-full">
      <div className="fixed top-0 z-10 w-full max-w-120 border-b border-gray-100 bg-white">
        <div className="relative mt-4 flex h-15 items-center justify-center bg-white px-4">
          <button
            className="absolute left-4 cursor-pointer"
            onClick={() => navigate('/profile')}>
            <img src={Before} alt="이전" className="cursor-pointer"/>
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
           나의 페르소나
          </h1>
        </div>
      </div>
  
    <main className="flex-1 overflow-y-auto scrollbar-hide flex flex-col items-center">
        <div className="w-full flex flex-col items-center justify-center mt-[110px] ">
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
              <div className='flex flex-row items-center gap-[4px] mb-[15px]'> 
                <img src={light} alt="핀리의 조언 아이콘" className="w-[16px] h-[16px]" />
                <p className="font-semibold text-[14px] bg-clip-text text-transparent w-fit"
                    style={{ backgroundImage: "linear-gradient(121deg, #E188FF 14.24%, #1677FF 96.82%)" }}>
                    핀리의 조언
                </p>
              </div>
            </div>
            <div className="w-full h-[114px] bg-[#F7F8FA] rounded-[20px] py-[24px] px-[12px] flex flex-col items-center justify-center ">
                {data.advice.map((line, index) => (
                <p 
                 key={index} 
                  className="text-center text-[#505050] font-medium leading-[22px] tracking-[-0.5px] text-[13px] break-keep w-full"
                >
                {line}
                </p>
              ))}
            </div>
          </div>
        </div>
        
        <div className="w-full px-[16px] mt-[125px] pb-[60px]">
          <button disabled className="disabled:cursor-not-allowed w-full py-[12px] h-[50px] bg-secondary text-white rounded-[12px]  leading-[26px] mb-[12px] font-semibold text-[18px]">
            이미지로 저장하기
          </button>
          <button
          onClick={handleRetest} 
          className=" cursor-pointer w-full h-[50px] py-[12px] bg-gray-50 text-gray-500 rounded-[12px] leading-[26px] font-semibold text-[18px]">
            테스트 다시하기
          </button>
        </div>
      </main>
    </div>
  );
};
export default MyPersona;