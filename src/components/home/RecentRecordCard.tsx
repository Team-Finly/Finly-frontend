import { EMOTION_CHART_MAP } from '@/constants/emotions';

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
    <div className="min-w-[256px] bg-white rounded-xl shadow-[#DFE2E81A] shadow-sm border border-[#F2F4F6] p-[12px]">
      <p className="text-[12px] pb-[6px] text-[#4E566066]">{record.date}</p>
  
      <div className="flex items-center">
        <div className="mb-[10px] flex items-center gap-2">
          <span className="">{record.logo}</span>
          <span className="text-[15px] font-semibold text-[#191F28]">
            {record.company}
          </span>
        </div>

        <div className="relative mb-[11.5px] ml-auto flex items-center">
          <span className="absolute -top-[18px] right-0 text-[14px] whitespace-nowrap text-[#4E5660CC]">
            2주
          </span>
          <p className="text-[18px] leading-none font-semibold text-gray-900">
            {record.price}
          </p>
        </div>
      </div>

      <div className="-mb-[3px] flex items-center justify-between">
        <span
          className="rounded-md px-[6px] py-[4px] text-[12px] font-semibold"
          style={{
            backgroundColor: emotion?.bgColor,
            color: emotion?.color,
          }}
        >
          {emotion?.label || record.status} Lv.
          <span className="font-bold"> {record.level}</span>
        </span>
        <span className="rounded bg-[#F2F4F6] px-1.5 py-0.5 text-[12px] font-medium text-[#8B95A1]">
          {record.type}
        </span>
      </div>
    </div>
  );
};
