import { PERSONA_DATA, type PersonaKey } from '@/constants/mypersona';
import light from '@/assets/icons/light.svg';
import { useEffect, useState } from 'react';
import { getMyPersona } from '@/apis/userApi';
import { useUserStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';
import { useSignupStore } from '@/store/signupStore';
import Before from '@/assets/icons/before.svg';

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
        console.error('페르소나 조회 실패:', error);
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
    <div className="flex h-full flex-col">
      <div className="fixed top-0 z-10 w-full max-w-120 border-b border-gray-100 bg-white">
        <div className="relative mt-4 flex h-15 items-center justify-center bg-white px-4">
          <button
            className="absolute left-4 cursor-pointer"
            onClick={() => navigate('/profile')}
          >
            <img src={Before} alt="이전" className="h-4 w-2 cursor-pointer" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">나의 페르소나</h1>
        </div>
      </div>
      <main className="scrollbar-hide flex flex-1 flex-col items-center overflow-y-auto">
        <div className="mt-[110px] flex w-full flex-col items-center justify-center">
          <div className="relative mt-[42px] mb-[31px] flex h-[70px] w-[77px] items-center justify-center">
            <img
              src={data.bgImage}
              alt="배경"
              className={`absolute top-1/2 left-1/2 z-0 -mt-[10px] max-w-none -translate-x-1/2 -translate-y-1/2 transform object-cover ${data.bgStyle}`}
            />
            <img
              src={data.image}
              alt={data.name}
              className="relative z-10 mb-[14px] h-[70px] w-[77px] object-contain"
            />
          </div>
          <div className="flex w-full flex-col px-[30px]">
            <div className="mb-[40px] text-center">
              <h2 className="mb-[14px] text-[20px] font-bold text-gray-900">
                {data.name}
              </h2>
              <p className="font-regular text-[12px] leading-[18px] whitespace-pre-wrap text-gray-500/40">
                {data.subDesc}
              </p>
            </div>
            <div className="flex w-full flex-col items-start">
              <div className="mb-[15px] flex flex-row items-center gap-[4px]">
                <img
                  src={light}
                  alt="핀리의 조언 아이콘"
                  className="h-[16px] w-[16px]"
                />
                <p
                  className="w-fit bg-clip-text text-[14px] font-semibold text-transparent"
                  style={{
                    backgroundImage:
                      'linear-gradient(121deg, #E188FF 14.24%, #1677FF 96.82%)',
                  }}
                >
                  핀리의 조언
                </p>
              </div>
            </div>
            <div
              className="flex h-[114px] w-full flex-col items-center justify-center rounded-[20px] px-[12px] py-[24px]"
              style={{
                backgroundColor: 'rgba(244, 245, 247, 0.6)',
                backgroundImage: `linear-gradient(120deg, rgba(242, 244, 255, 0.2) 0%, rgba(180, 226, 255, 0.2) 100%)`,
                backgroundBlendMode: 'normal',
              }}
            >
              {data.advice.map((line, index) => (
                <p
                  key={index}
                  className="w-full text-center text-[13px] leading-[22px] font-medium tracking-[-0.5px] break-keep text-[#505050]"
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="fixed bottom-15 w-full max-w-120 px-[16px]">
          <button
            onClick={handleRetest}
            className="h-[50px] w-full cursor-pointer rounded-[12px] bg-gray-50 py-[12px] text-[18px] leading-[26px] font-semibold text-gray-500"
          >
            테스트 다시하기
          </button>
        </div>
      </main>
    </div>
  );
};
export default MyPersona;
