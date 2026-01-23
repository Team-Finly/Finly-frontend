import { EMOTION_CHART_MAP } from '@/constants/emtions';

// 추후 정확한 타입 정의
type Record = {
  company: string;
  price: string;
  status: keyof typeof EMOTION_CHART_MAP;
  level: string;
  type: string;
  logo: string;
  date: string;
  period: string;
};

export const RecentRecordCard = ({ record }: { record: Record }) => {
  const emotion = EMOTION_CHART_MAP[record.status];

  return (
    <div className="min-w-[256px] bg-white rounded-xl shadow-[#DFE2E81A] shadow-sm border border-[#F2F4F6]  p-[12px]">
      <p className="text-[12px] pb-[6px] text-[#4E566066]">{record.date}</p>
  
      <div className="flex items-center">
        <div className="flex items-center gap-2 mb-[10px]">
          <span className="">{record.logo}</span>
          <span className="text-[15px] font-semibold text-[#191F28]">{record.company}</span>
        </div>

        <div className="ml-auto relative flex items-center mb-[11.5px]">
          <span className="absolute -top-[18px] right-0 text-[14px] text-[#4E5660CC] whitespace-nowrap">
            2주
          </span>
          <p className="text-[18px] font-semibold text-gray-900 leading-none">
            {record.price}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center -mb-[3px]">
        <span 
          className="text-[12px] px-[6px] py-[4px] rounded-md font-semibold"
          style={{ 
            backgroundColor: emotion?.bgColor, 
            color: emotion?.color 
          }}
        >
          {emotion?.label || record.status} Lv.
          <span className="font-bold"> {record.level}</span>
        </span>
        <span className="text-[12px] text-[#8B95A1] bg-[#F2F4F6] px-1.5 py-0.5 rounded font-medium">
          {record.type}
        </span>
      </div>
    </div>
  );
};
