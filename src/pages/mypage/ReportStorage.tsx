import { useNavigate } from "react-router-dom";
import leftarrow from '@/assets/icons/Vector.svg';
import rightarrow from '@/assets/icons/rightarrow.svg';
import blueround from '@/assets/icons/blueround.svg';
import book from '@/assets/icons/book.svg';
import lock from '@/assets/icons/lock.svg';
import run from '@/assets/icons/run.svg';
import trophy from '@/assets/icons/trophy.svg';
import whiteround1 from '@/assets/icons/whiteround1.svg';
import whiteround2 from '@/assets/icons/whiteround2.svg';
import yellowround from '@/assets/icons/yellowround.svg';
import road from '@/assets/icons/road.svg';
import cloud from '@/assets/images/cloud.png';
import star from '@/assets/icons/star.svg';
import { useUserStore } from "@/store/userStore";

const ReportStorage = () => {
  const navigate = useNavigate();
  const { nickname } = useUserStore();
  const currentYM = "2026-02"; 

  const handleNavigate = (week?: string) => {
    const path = week ? `/reports/${currentYM}/${week}` : `/reports/${currentYM}`;
    navigate(path);
  };

  return (
    <div className="relative flex flex-col h-screen w-full bg-gradient-to-b from-[#E6F2FF] to-[#F5FAFF] overflow-hidden text-gray-900">
      <div className="absolute top-0 left-0 w-full h-[253px] mix-blend-lighten">
        <img src={cloud} alt="배경" className="w-full h-full object-cover mix-blend-screen" />
      </div>

      <header className="relative z-10 flex items-center justify-center h-[60px] px-4 flex-shrink-0">
        <div className="flex items-center gap-[20px]">
          <button disabled className="p-2 opacity-30"><img src={leftarrow} alt="L" className="w-[10px]" /></button>
          <span className="font-semibold text-[18px]">2026.2월</span>
          <button disabled className="p-2 opacity-30"><img src={rightarrow} alt="R" className="w-[10px]" /></button>
        </div>
        <button onClick={() => navigate(-1)} className="absolute right-4 text-gray-500 font-medium">닫기</button>
      </header>

      <div className="relative px-6 mt-[50px] z-10">
        <div className="flex items-center gap-2 text-[20px] font-bold">
            <span>{nickname}님, 이번 달</span>
          <img src={star} alt="별" className="w-[18px] rotate-[15deg] mix-blend-overlay" />
        </div>
        <p className="text-[20px] font-bold">
          <span className="text-secondary">20개의 조각</span>을 모았어요!
        </p>
      </div>

      <div className="flex-1 w-full relative flex items-center justify-center pb-4">
        <img src={road} alt="road" className="absolute top-[15%] w-full h-full object-contain opacity-90" />
        
        <div className="relative aspect-[340/700] h-full max-h-[95%] w-auto">
          {/* 월간 리포트 */}
          <div onClick={() => handleNavigate()} className="absolute top-[7%] left-[48%] -translate-x-1/2 flex flex-col items-center z-20 cursor-pointer transition-transform active:scale-95">
            <div className="relative w-[85px] h-[85px] flex items-center justify-center">
              <img src={yellowround} alt="bg" className="absolute w-full h-full" />
              <img src={trophy} alt="trophy" className="relative z-10 w-[32px] mb-1" />
            </div>
            <div className="mt-[-5px] bg-gray-900 text-white text-[13px] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap">2월 월간 리포트</div>
          </div>

          {/* 4주차 */}
          <div className="absolute top-[40%] left-[72%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center opacity-50">
            <div className="relative w-[54px] h-[54px] flex items-center justify-center">
              <img src={whiteround2} alt="bg" className="absolute w-full h-full" />
              <img src={lock} alt="lock" className="relative z-10 w-[20px] grayscale" />
            </div>
            <div className="mt-2 w-[58px] h-[28px] rounded-full bg-white text-gray-400 flex items-center justify-center text-[12px] font-semibold">4주차</div>
          </div>

          {/* 3주차 */}
          <div className="absolute top-[55%] left-[15%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-transform active:scale-95">
            <div className="absolute bottom-[105%] mb-2 bg-white px-3 py-2 rounded-[12px] whitespace-nowrap z-30 animate-bounce shadow-md">
              <span className="text-[12px] font-medium">진행 중이에요!</span>
              <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
            </div>
            <div className="relative w-[80px] h-[80px] flex items-center justify-center">
              <img src={blueround} alt="bg" className="absolute w-full h-full" />
              <img src={book} alt="book" className="relative z-10 w-[24px]" />
            </div>
            <div className="w-[58px] h-[28px] rounded-full bg-gray-900 text-white flex items-center justify-center text-[12px] font-semibold">3주차</div>
          </div>

          {/* 2주차 */}
          <div onClick={() => handleNavigate("2")} className="absolute top-[70%] left-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-transform active:scale-95">
            <div className="relative w-[60px] h-[60px] flex items-center justify-center">
              <img src={whiteround1} alt="bg" className="absolute w-full h-full" />
              <img src={run} alt="run" className="relative z-10 w-[24px]" />
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#3092FF] rounded-full border-2 border-white flex items-center justify-center z-20 shadow-sm text-white text-[10px] font-bold">✓</div>
            </div>
            <div className="w-[58px] h-[28px] mt-2 rounded-full bg-white text-secondary flex items-center justify-center text-[12px] font-semibold shadow-sm">2주차</div>
          </div>

          {/* 1주차 */}
          <div onClick={() => handleNavigate("1")} className="absolute top-[89%] left-[14%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-transform active:scale-95">
            <div className="relative w-[60px] h-[60px] flex items-center justify-center">
              <img src={whiteround1} alt="bg" className="absolute w-full h-full" />
              <img src={run} alt="run" className="relative z-10 w-[24px]" />
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#3092FF] rounded-full border-2 border-white flex items-center justify-center z-20 shadow-sm text-white text-[10px] font-bold">✓</div>
            </div>
            <div className="w-[58px] h-[28px] mt-2 rounded-full bg-white text-secondary flex items-center justify-center text-[12px] font-semibold shadow-sm">1주차</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportStorage;