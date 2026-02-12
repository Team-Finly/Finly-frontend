import One from '@/assets/icons/report-one.svg';
import Two from '@/assets/icons/report-two.svg';
import Three from '@/assets/icons/report-three.svg';

interface LabelItem {
  img?: string;
  name?: string;
  value: string;
  color: string;
}

interface MindPieceProps {
  type: 'monthly' | 'weekly';
  week?: string;
  yearMonth?: string;
}

const KEYWORD_COLORS: Record<string, string> = {
  "후회": "text-[#747E7F]",
  "평온": "text-[#24B2FF]",
  "확신": "text-[#EA4860]",
  "불안": "text-[#BB5FF8]",
  "탐욕": "text-[#FFE436]",
};

const MindPiece = ({ type, week, yearMonth }: MindPieceProps) => {
  const isWeekly = type === 'weekly';

  const MIND_DATA_REPORTS: Record<string, any> = {
    "2026-01": {
      weekly: {
        "1": {
          count: 12, compareText: "", change: "",
          labels: [
            { img: One, name: "불안", value: "60%", color: "bg-[#BB5FF8]" },
            { img: Two, name: "후회", value: "25%", color: "bg-[#747E7F]" },
            { img: Three, name: "평온", value: "15%", color: "bg-[#24B2FF]" },
          ]
        },
        "2": {
          count: 8, compareText: "지난 주 대비", change: "확신 +74%",
          labels: [
            { img: One, name: "확신", value: "74%", color: "bg-[#EA4860]" },
            { img: Two, name: "탐욕", value: "26%", color: "bg-[#FFE436]" },
          ]
        },
        "3": {
          count: 15, compareText: "지난 주 대비", change: "평온 +67%",
          labels: [
            { img: One, name: "평온", value: "67%", color: "bg-[#24B2FF]" },
            { img: Two, name: "후회", value: "33%", color: "bg-[#747E7F]" },
          ]
        },
        "4": {
          count: 15, compareText: "지난 주 대비", change: "확신 +52%",
          labels: [
            { img: One, name: "확신", value: "52%", color: "bg-[#EA4860]" },
          { img: Two, name: "평온", value: "30%", color: "bg-[#24B2FF]" },
          { img: Three, name: "탐욕", value: "10%", color: "bg-[#FFE436]" }, 
          { value: "8%", color: "bg-[#747E7F]" },
          ]
        }
      },
      monthly: {
        count: 41, compareText: "지난 월 대비", change: "평온 +12%",
        labels: [
          { img: One, name: "확신", value: "45%", color: "bg-[#EA4860]" },
          { img: Two, name: "평온", value: "25%", color: "bg-[#24B2FF]" },
          { img: Three, name: "불안", value: "10%", color: "bg-[#BB5FF8]" },
          { value: "10%", color: "bg-[#747E7F]" },
          { value: "10%", color: "bg-[#FFE436]" },
        ]
      }
    },
    "2026-02": {
      weekly: {
        "1": {
          count: 10,
          compareText: "지난 주 대비",
          change: "후회 +25%",
          labels: [
            { img: One, name: "불안", value: "60%", color: "bg-[#BB5FF8]" },
            { img: Two, name: "후회", value: "25%", color: "bg-[#747E7F]" },
            { img: Three, name: "확신", value: "10%", color: "bg-[#EA4860]" },
            { value: "5%", color: "bg-[#24B2FF]" },
          ]
        },
        "2": {
          count: 8,
          compareText: "지난 주 대비",
          change: "확신 +52%",
          labels: [
            { img: One, name: "확신", value: "52%", color: "bg-[#EA4860]" },
            { img: Two, name: "평온", value: "30%", color: "bg-[#24B2FF]" },
            { img: Three, name: "탐욕", value: "10%", color: "bg-[#FFE436]" },
            { value: "8%", color: "bg-[#747E7F]" },
          ]
        }
      },
      monthly: {
        count: 34, compareText: "지난 월 대비", change: "평온 +12%",
        labels: [
          { img: One, name: "평온", value: "65%", color: "bg-[#24B2FF]" },
          { img: Two, name: "확신", value: "25%", color: "bg-[#EA4860]" },
          { img: Three, name: "불안", value: "10%", color: "bg-[#BB5FF8]" }
        ]
      }
    }
  };

  const monthData = MIND_DATA_REPORTS[yearMonth as string] || MIND_DATA_REPORTS["2026-02"];

  const data = (isWeekly 
    ? monthData.weekly[week as string] || monthData.weekly["1"] 
    : monthData.monthly) as { count: number; compareText: string; change: string; labels: LabelItem[] };
  
  const getChangeColor = (changeText: string) => {
    const keyword = Object.keys(KEYWORD_COLORS).find(key => changeText.includes(key));
    return keyword ? KEYWORD_COLORS[keyword] : "text-secondary";
  };


  return (
    <div className="mt-[27px]">
      <div className="flex items-center justify-between text-sm">
        <div className="text-[17px] font-semibold">
          <span className="text-secondary">{data.count}
            <span className="text-white">개의 마음 조각</span>
          </span>
        </div>
        <div className="text-[12px] pt-[3px]">
          <span className="">{data.compareText}
            <span className={`${getChangeColor(data.change)}`}> {data.change}</span>
          </span>
        </div>
      </div>

      <div className="mt-[16px] h-[20px] w-full overflow-hidden rounded-full bg-white/10">
        <div className="flex h-full gap-[2px]">
          {data.labels.map((item, i) => (
            <div
              key={i}
              style={{ width: item.value }}
              className={`${item.color} first:rounded-l-full last:rounded-r-full`}
            />
          ))}
        </div>
      </div>

      <div className="mt-[20px] flex justify-between text-[14px] px-[27px]">
        {data.labels.slice(0, 3).map((item, i) => (
          <span key={i} className="flex items-center text-white font-semibold">
            {item.img && (
              <img src={item.img} className="w-[20px] h-[20px] mr-[5px]" alt={item.name} />
            )}
            {item.name} <span className="ml-1 text-gray-400 font-normal">{item.value}</span>
          </span>
        ))}

        {data.labels.length < 3 &&
          Array.from({ length: 3 - data.labels.length }).map((_, i) => (
            <span key={`empty-${i}`} className="w-[60px]" aria-hidden="true" />
          ))
        }
      </div>
    </div>
  );
};

export default MindPiece;