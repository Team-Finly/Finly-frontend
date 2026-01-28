import RelationChart from '@/components/stats/RelationChart';
import RelationFear from '@/components/stats/RelationFear';
import RelationConviction from '@/components/stats/RelationConviction';
import RelationPattern from '@/components/stats/RelationPattern';

const RelationTab = () => {
  return (
    <div className="flex w-full flex-1 flex-col gap-5 bg-gray-50 px-4 py-5">
      <RelationChart />
      <div className="grid grid-cols-2 gap-4">
        <RelationFear />
        <RelationConviction />
      </div>
      <RelationPattern />
    </div>
  );
};

export default RelationTab;
