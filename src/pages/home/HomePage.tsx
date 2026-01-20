import { MindScore } from '@/components/home/MindScore';
import TelescopeIcon from '@/assets/images/Telescope.svg';
import Bell from '@/assets/images/Vector.svg';
import { WeeklyMood } from '@/components/home/WeeklyMood';
import { RecentRecordList } from '@/components/home/RecentRecordList';
import { RealtimeInsight } from '@/components/home/RealtimeInsight';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 text-gray-900">
      {/* 상단 바 */}
      <header className="flex items-center bg-white justify-between p-4 pb-[9px]">
        <div className="flex gap-2 bg-[#F0F6FF] items-center px-[16px] py-[9px] rounded-full text-[13px] text-[#4E5660]">
          <img src={TelescopeIcon} alt="망원경 아이콘" className="w-5 h-5" />
          <span>코스피 255</span>
          <span>코스닥 852</span>
        </div>
        <button className="relative px-[4px]">
          <img src={Bell} alt="알림 아이콘" className="w-6 h-6" />
          <span className="absolute top-[-6px] right-[2px] w-2.5 h-2.5 bg-[#F04452] rounded-full border-2 border-white"></span>
        </button>
      </header>

      <div className="mt-[20px] px-[16px]">
        <MindScore />
        <WeeklyMood />
        <RecentRecordList />
        <RealtimeInsight />
      </div>
    </div>
  );
};
export default HomePage;