import { MindScore } from '@/components/home/MindScore/MindScore';
import { WeeklyMood } from '@/components/home/WeeklyMood';
import { RecentRecordList } from '@/components/home/RecentRecordList';
import { RealtimeInsight } from '@/components/home/RealtimeInsight';
import Header from '@/components/home/Header';
import { useNavigate } from 'react-router-dom';
import { useMindScore } from '@/hooks/useMindScore';
import { HomeEmptyState } from '@/components/home/HomeEmptyState';
import MindScoreInfoModal from '@/components/home/MindScore/MindScoreInfoModal';
import { useState } from 'react';

const HomePage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isError, isLoading } = useMindScore();

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <Header />
      <main className="flex-1 overflow-y-auto scrollbar-hide pt-[20px] px-[16px]">
        {isLoading && (
          <HomeEmptyState message="금융 마음 지수를 불러오는 중이에요..." />
        )}

        {isError && (
          <HomeEmptyState
            message="금융 마음 지수를 불러오지 못했어요."
            subMessage="잠시 후 다시 시도해주세요."
          />
        )}
        {!isLoading && !isError && data && (
          <div
            role="button"
            tabIndex={0}
            onClick={() => navigate('/mindscore')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate('/mindscore'); }}
            className="block w-full text-left bg-transparent cursor-pointer"
          >
            <MindScore mindScore={data} />
          </div>
        )}

        <div className="flex justify-end mt-[12px]">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-[12px] text-gray-500 underline underline-offset-2 transition-colors cursor-pointer"
          >
            금융 마음 지수란?
          </button>
        </div>
        <MindScoreInfoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        
        <WeeklyMood />
        <RecentRecordList />
        <RealtimeInsight />
      </main>
    </div>
  );
};

export default HomePage;