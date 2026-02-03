import { MindScore } from '@/components/home/MindScore/MindScore';
import { WeeklyMood } from '@/components/home/WeeklyMood';
import { RecentRecordList } from '@/components/home/RecentRecordList';
import { RealtimeInsight } from '@/components/home/RealtimeInsight';
import Header from '@/components/home/Header';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <Header />
      <main className="flex-1 overflow-y-auto scrollbar-hide pt-[20px] px-[16px]">
        <button
          onClick={() => navigate('/mindscore')}
          className="block w-full text-left bg-transparent"
        >
          <MindScore />
        </button>

        <div className="flex justify-end mt-[12px]">
        <button
          type="button"
          onClick={() => { }}
          className="text-[12px] text-gray-500 underline underline-offset-2 transition-colors"
        >
          금융 마음 지수란?
        </button>
        </div>
        
        <WeeklyMood />
        <RecentRecordList />
        <RealtimeInsight />
      </main>
    </div>
  );
};

export default HomePage;