import { useNavigate } from "react-router-dom";
import leftarrow from '@/assets/icons/Vector.svg';
import rightarrow from '@/assets/icons/rightarrow.svg';
import blueround from '@/assets/icons/blueround.svg';
import book from '@/assets/icons/book.svg' ;
import lock from '@/assets/icons/lock.svg';
import run from '@/assets/icons/run.svg';
import trophy from '@/assets/icons/trophy.svg';
import whiteround1 from '@/assets/icons/whiteround1.svg';
import whiteround2 from '@/assets/icons/whiteround2.svg';
import yellowround from '@/assets/icons/yellowround.svg';
import road from '@/assets/icons/road.svg';
import cloud from '@/assets/images/cloud.png';
import star from '@/assets/icons/star.svg';
const ReportRoadmapPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col h-screen w-full bg-gradient-to-b from-[#E6F2FF] to-[#F5FAFF] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[253px] mix-blend-lighten">
          <img 
            src={cloud} 
            alt="구름 배경" 
            className="w-full h-full object-cover mix-blend-screen" 
          />
      </div>
        {/* 헤더 */}
      <header className="relative z-10 flex items-center justify-center h-[60px] px-4 flex-shrink-0">
        <div className="flex items-center gap-[20px]">
            <button onClick={() => navigate(-1)} className="p-2 cursor-pointer">
               <img src={leftarrow} alt="왼쪽" className="w-[10px] h-[18px]" />
            </button>
            <span className="font-semibold text-gray-900 text-[18px] mx-[20px]">2026.2월</span>
            <button>
                <img src={rightarrow} alt="오른쪽" className="w-[10px] h-[18px]" />
            </button>
        </div>
        <button onClick={() => navigate(-1)} className="cursor-pointer absolute right-4 text-[16px] text-gray-500 font-medium">닫기</button>
      </header>

      <div className="relative px-6 mt-[50px] flex-shrink-0">
        <h1 className="text-[20px] font-bold text-gray-900 leading-[32px]">
            <div className="flex items-center gap-[15px] ">
                <span>조아님, 이번 달</span>
                <img src={star} alt="별" className="w-[18px] h-[22px] mb-1 rotate-[15deg] opacity-100 mix-blend-overlay" />
            </div>
            <span className="text-secondary">20개의 조각</span>을 모았어요!
    
        </h1>
      </div>

      <div className="flex-1 w-full relative overflow-hidden flex items-center justify-center pb-4">
            <img 
              src={road} 
              alt="로드맵" 
              className="absolute top-[15%] w-full h-full object-contain opacity-90"
            />
        <div className="relative aspect-[340/700] h-full max-h-[95%] w-auto">
            <div className="absolute top-[7%] left-[48%] -translate-x-1/2 flex flex-col items-center z-20">
                <div className="relative flex items-center justify-center w-[85px] h-[85px]">
                    <img src={yellowround} alt="배경" className="absolute w-full h-full object-cover" />
                    <img src={trophy} alt="트로피" className="relative z-10 w-[32px] h-[32px] mb-1" />
                </div>
                <div className="mt-[-5px] bg-gray-900 text-white text-center text-[13px] font-semibold px-3 py-1.5 rounded-full font-bold shadow-lg z-30 whitespace-nowrap">
                  2월 월간 리포트
                </div>
            </div>
            {/* 4주차 */}
            <div className="absolute top-[40%] left-[72%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="relative w-[54px] h-[54px] flex items-center justify-center">
                    <img src={whiteround2} alt="배경" className="absolute w-full h-full" />
                    <img src={lock} alt="잠김" className="relative grayscale z-10 w-[20px]" />
                </div>
                <div className="mt-2 w-[58px] h-[28px] rounded-full bg-white text-gray-400 flex items-center justify-center">
                    <span className="text-[12px] font-semibold text-gray-500 text-center">4주차</span>
                </div>
            </div>

            {/* 3주차 */}
            <div className="absolute top-[55%] left-[15%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="absolute bottom-[100%] mb-2 bg-white px-[12px] py-[10px] rounded-[12px] whitespace-nowrap z-30 animate-bounce">
                    <span className="text-[12px] font-medium text-gray-900 text-center">진행 중이에요!</span>
                    <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45"></div>
                </div>
                <div className="relative w-[80px] h-[80px] flex items-center justify-center">
                    <img src={blueround} alt="배경" className="absolute w-full h-full " />
                    <img src={book} alt="책" className="relative z-10 w-[24px]" />
                </div>
                <div className="w-[58px] h-[28px] rounded-full bg-gray-900 text-gray-800 flex items-center justify-center">
                    <span className="text-[12px] text-white font-semibold text-center">3주차</span>
                </div>
            </div>

            {/* 2주차 */}
            <div className="absolute top-[70%] left-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="relative w-[60px] h-[60px] flex items-center justify-center">
                    <img src={whiteround1} alt="배경" className="absolute w-full h-full" />
                    <img src={run} alt="완료" className="relative z-10 w-[24px]" />
                    <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#3092FF] rounded-full border-[2px] border-white flex items-center justify-center z-20">
                        <span className="text-white text-[10px] font-bold">✓</span>
                    </div>
                </div>
                <div className="w-[58px] h-[28px] mt-[8px] rounded-full bg-white text-gray-800 flex items-center justify-center">
                    <span className="text-[12px] text-secondary font-semibold">2주차</span>
                </div>
            </div>

            {/* 1주차 */}
            <div className="absolute top-[89%] left-[14%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="relative w-[60px] h-[60px] flex items-center justify-center">
                    <img src={whiteround1} alt="배경" className="absolute w-full h-full" />
                    <img src={run} alt="완료" className="relative z-10 w-[24px]" />
                    <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#3092FF] rounded-full border-[2px] border-white flex items-center justify-center z-20">
                        <span className="text-white text-[10px] font-bold">✓</span>
                    </div>
                </div>
                <div className="w-[58px] h-[28px] mt-[8px] rounded-full bg-white text-gray-800 flex items-center justify-center">
                    <span className="text-[12px] text-secondary font-semibold">1주차</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};  

export default ReportRoadmapPage;