import One from '@/assets/icons/report-one.svg';
import Two from '@/assets/icons/report-two.svg';
import Three from '@/assets/icons/report-three.svg';

const MindPiece = () => {
  return (
    <div className="mt-[27px]">
      <div className="flex items-center justify-between text-sm">
        <div className="text-[17px] font-semibold">
          <span className="text-secondary">34
            <span className="text-white">개의 마음 조각</span>
          </span>
        </div>
        <div className="text-[12px] pt-[3px]">
          <span className="">지난 월 대비
            <span className="text-secondary"> 평온 +12%</span>
          </span>
        </div>
      </div>

      <div className="mt-[16px] h-[20px] w-full overflow-hidden rounded-full bg-white/10">
        <div className="flex h-full gap-[2px] ">
          <div className="w-[65%] bg-sky-400 rounded-r-[1px]" />
          <div className="w-[25%] bg-pink-500 rounded-[1px]" />
          <div className="w-[10%] bg-purple-500 rounded-l-[1px]" />
        </div>
      </div>

      <div className="mt-[20px] flex justify-between text-[14px] px-[20px]">
        <span className="text-white font-semibold">
          <img src={One} className="w-[24px] h-[24px] inline mr-[7px]" alt="평온 아이콘" />
          평온 <span className="text-gray-300">65%</span></span>
        <span className="text-white font-semibold">
          <img src={Two} className="w-[24px] h-[24px] inline mr-[7px]" alt="확신 아이콘" />
          확신 <span className="text-gray-300">25%</span></span>
        <span className="text-white font-semibold">
          <img src={Three} className="w-[24px] h-[24px] inline mr-[7px]" alt="불안 아이콘" />
          불안 <span className="text-gray-300">10%</span></span>
      </div>
    </div>
  );
};

export default MindPiece;