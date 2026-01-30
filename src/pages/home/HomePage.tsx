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
        <WeeklyMood />
        <RecentRecordList />
        <RealtimeInsight />
      </main>
    </div>
  );
};

export default HomePage;