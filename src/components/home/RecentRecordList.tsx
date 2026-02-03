import { useNavigate } from 'react-router-dom';
import { RecentRecordCard } from '@/components/home/RecentRecordCard';
import RightIcon from '@/assets/images/right.svg';

const records = [
  {
    id: 1,
    company: '테슬라',
    price: '72,400원',
    status: 'ANXIETY',
    level: '7',
    type: '매수',
    logo: '🚗',
    date: '12.25',
    period: '2주',
  },
  {
    id: 2,
    company: '애플',
    price: '189,000원',
    status: 'CONFIDENCE',
    level: '5',
    type: '매수',
    logo: '🍎',
    date: '12.24',
    period: '1달',
  },
  {
    id: 3,
    company: '엔비디아',
    price: '512,000원',
    status: 'CALM',
    level: '9',
    type: '매도',
    logo: '🟢',
    date: '12.20',
    period: '3주',
  },
];

export const RecentRecordList = () => {
  const navigate = useNavigate();

  return (
    <div>
      <section className="mt-[24px]">
        <div className="mb-[16px] flex items-center justify-between">
          <h3 className="text-[17px] font-semibold">최근 나의 기록</h3>
          <button
            className="flex items-center text-[13px] text-gray-500"
            onClick={() => navigate('/record')}
          >
            <span className="leading-none cursor-pointer">전체 보기</span>
            <img
              src={RightIcon}
              alt="오른쪽 화살표"
              className="ml-[3px] h-[10px] w-[10px] translate-y-[0.6px]"
            />
          </button>
        </div>
        <div className="scrollbar-hide -mx-[16px] overflow-x-auto cursor-pointer">
          <div className="flex gap-2 px-[16px]">
            {records.map((record) => (
              <RecentRecordCard key={record.id} record={record} />
            ))}
            <div className="min-w-[8px] flex-shrink-0" />
          </div>
        </div>
      </section>
    </div>
  );
};
