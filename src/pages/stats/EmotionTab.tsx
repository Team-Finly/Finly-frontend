import EmotionChart from '@/components/stats/EmotionChart';
import Keywords from '@/components/stats/Keywords';
import GoldenTime from '@/components/stats/GoldenTime';

const EmotionTab = () => {
  return (
    <div className="flex w-full flex-1 flex-col gap-5 bg-gray-50 px-4 py-5">
      <EmotionChart />
      <Keywords />
      <GoldenTime />
    </div>
  );
};

export default EmotionTab;
