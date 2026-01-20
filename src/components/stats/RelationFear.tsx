import UpIcon from '../../assets/images/stats_up.svg';
import DownIcon from '../../assets/images/stats_down.svg';
import FlatIcon from '../../assets/images/stats_flat.svg';

const RelationFear = () => {
  return (
    <div className="rounded-[12px] border-[1.2px] border-gray-100 bg-white p-4">
      <div className="mb-3 text-[14px] font-semibold text-gray-500">
        하락장 공포 지수
      </div>
      <div className="mb-1 flex flex-row items-baseline">
        <div className="mr-1 text-[26px] font-semibold text-gray-900">78</div>
        <img src={UpIcon} alt="주가 변동 아이콘" className="mr-0.5" />
        <div className="text-stock-buy text-[12px] font-medium">12</div>
      </div>
      <div className="text-[11px] font-medium text-gray-300">
        평소보다 불안에 예민
      </div>
    </div>
  );
};

export default RelationFear;
