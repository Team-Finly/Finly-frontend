import { useNavigate } from "react-router-dom";
import leftarrow from '@/assets/icons/Vector.svg';
import rightarrow from '@/assets/icons/rightarrow.svg';
import book from '@/assets/icons/book.svg';
import lock from '@/assets/icons/lock.svg';
import run from '@/assets/icons/run.svg';
import trophy from '@/assets/icons/trophy.svg';
import road from '@/assets/icons/road.svg';
import cloud from '@/assets/images/cloud.png';
import star from '@/assets/icons/star.svg';
import check from '@/assets/icons/checkround.svg';
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
        <button onClick={() => navigate(-1)} className="absolute right-4 text-gray-500 font-medium cursor-pointer">닫기</button>
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
        <div className="relative aspect-[450/1000] h-full max-h-[95%] w-auto">
          <img src={road} alt="road" className="absolute top-[15%] w-full h-full object-contain" />
          {/* 월간 리포트 */}
          <div onClick={() => handleNavigate()} className="absolute top-[9%] left-[48%] -translate-x-1/2 flex flex-col items-center z-20 cursor-pointer transition-transform active:scale-95">
            <div className="cursor-pointer border-2 border-white relative w-[60px] h-[60px] bg-gradient-to-b from-[#FFEE9B] to-[#FFB835] rounded-full flex items-center justify-center">
              <img src={trophy} alt="trophy" className="relative z-10 w-[28px]" />
            </div>
            <div className="mt-[8px] bg-gray-900 text-white text-[13px] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap">2월 월간 리포트</div>
          </div>

          {/* 4주차 */}
          <div className="absolute top-[40%] left-[72%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="cursor-pointer border-2 border-white relative w-[60px] h-[60px] bg-gray-50 rounded-full flex items-center justify-center">
              <img src={lock} alt="lock" className="relative z-10 w-[26px] grayscale" />
            </div>
            <div className="mt-[8px] w-[58px] h-[28px] rounded-full bg-white text-gray-400 flex items-center justify-center text-[12px] font-semibold">4주차</div>
          </div>

          {/* 3주차 */}
          <div className="absolute top-[55%] left-[15%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-transform active:scale-95">
            <div className="absolute bottom-[105%] mb-2 bg-white px-3 py-2 rounded-[12px] whitespace-nowrap z-30 animate-bounce shadow-md">
              <span className="text-[12px] font-medium">진행 중이에요!</span>
              <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
            </div>
            <div className="cursor-pointer border-2 border-white relative w-[60px] h-[60px] bg-secondary rounded-full flex items-center justify-center">
              <img src={book} alt="book" className="relative z-10 w-[26px]" />
            </div>
            <div className="w-[58px] h-[28px] mt-[8px] rounded-full bg-gray-900 text-white flex items-center justify-center text-[12px] font-semibold">3주차</div>
          </div>

          {/* 2주차 */}
          <div onClick={() => handleNavigate("2")} className="absolute top-[68%] left-[80%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-transform active:scale-95">
            <div className="relative w-[60px] h-[60px] bg-white rounded-full shadow-[0_0_10px_theme(colors.secondary/20%)] flex items-center justify-center">
              <img src={run} alt="run" className="relative z-10 w-[27px]" />
              <img src={check} alt="" className="absolute bottom-0 right-0 " />
            </div>
            <div className="w-[58px] h-[28px] mt-[8px] rounded-full bg-white text-secondary flex items-center justify-center text-[12px] font-semibold shadow-sm">2주차</div>
          </div>

          {/* 1주차 */}
          <div onClick={() => handleNavigate("1")} className="absolute top-[85%] left-[14%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-transform active:scale-95">
            <div className="relative w-[60px] h-[60px] bg-white rounded-full shadow-[0_0_10px_theme(colors.secondary/20%)] flex items-center justify-center">
              <img src={run} alt="run" className="relative z-10 w-[27px]" />
              <img src={check} alt="" className="absolute bottom-0 right-0 " />
            </div>
            <div className="w-[58px] h-[28px] mt-[8px] rounded-full bg-white text-secondary flex items-center justify-center text-[12px] font-semibold shadow-sm">1주차</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportStorage;