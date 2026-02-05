import { useNavigate } from 'react-router-dom';
import { RecentRecordCard } from '@/components/home/RecentRecordCard';
import RightIcon from '@/assets/images/right.svg';
import { useHomeRecords } from '@/hooks/useHomeRecords';
import { stockInfoStore } from '@/store/StockInfoStore';

export const EmptyRecentRecordCard = () => {
  return (
    <div className="min-w-[100%] bg-white rounded-xl border border-[#F2F4F6] p-[12px] flex flex-col justify-center items-center text-center">
      <p className="text-[14px] font-medium text-[#8B95A1]">
        아직 기록이 없어요
      </p>
      <p className="mt-[4px] text-[12px] text-[#B0B8C1]">
        첫 매매 기록을 남겨보세요
      </p>
    </div>
  );
};

export const RecentRecordList = () => {
  const navigate = useNavigate();

  const { data: records, isLoading } = useHomeRecords();
  const stockMap = stockInfoStore((state) => state.stockMap);

  if (isLoading || !records) return null;

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
            {records.length === 0 ? (
              <EmptyRecentRecordCard />
            ) : (
              records.map((record) => (
                <RecentRecordCard
                  key={record.recordId}
                  record={record}
                  stock={stockMap[record.symbol]}
                />
              ))
            )}
            <div className="min-w-[8px] flex-shrink-0" />
          </div>
        </div>
      </section>
    </div>
  );
};
