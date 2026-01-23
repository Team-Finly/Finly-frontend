import { useNavigate } from 'react-router-dom';
import { RecentRecordCard } from './RecentRecordCard'
import RightIcon from '@/assets/images/right.svg';

const records = [
  {
    id: 1,
    company: "테슬라",
    price: "72,400원",
    status: "ANXIETY",
    level: "7",
    type: "매수",
    logo: "🚗",
    date: "12.25",
    period: "2주",
  },
  {
    id: 2,
    company: "애플",
    price: "189,000원",
    status: "CONFIDENCE",
    level: "5",
    type: "매수",
    logo: "🍎",
    date: "12.24",
    period: "1달",
  },
  {
    id: 3,
    company: "엔비디아",
    price: "512,000원",
    status: "CALM",
    level: "9",
    type: "매도",
    logo: "🟢",
    date: "12.20",
    period: "3주",
  },
];

export const RecentRecordList = () => {
  const navigate = useNavigate();

  return (
    <div>
      <section className="mt-[24px]">
        <div className="flex justify-between items-center mb-[16px]">
          <h3 className="font-semibold text-[17px]">최근 나의 기록</h3>
          <button
            className="flex items-center text-[13px] text-gray-500"
            onClick={() => navigate('/record')}
          >
            <span className="leading-none">전체 보기</span>
            <img
              src={RightIcon}
              alt="오른쪽 화살표"
              className="w-[10px] h-[10px] ml-[3px] translate-y-[0.6px]"
            />
          </button>
        </div>
        <div className="flex gap-[8px] overflow-x-auto pb-2 scrollbar-hide">
          {records.map((record) => (
            <RecentRecordCard key={record.id} record={record} />
          ))}
        </div>
      </section>
    </div>
  );
};
