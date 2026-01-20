import { RecentRecordCard } from './RecentRecordCard'
import RightIcon from '@/assets/images/right.svg';

export const RecentRecordList = () => {
  return (
    <div>
      <section className="mt-[24px]">
        <div className="flex justify-between items-center mb-[16px]">
          <h3 className="font-semibold text-[17px]">최근 나의 기록</h3>
          <button className="flex items-center text-[13px] text-[#6E757D]">
            <span>전체 보기</span>
            <img
              src={RightIcon}
              alt="오른쪽 화살표"
              className="w-[10px] h-[10px] ml-[3px]"
            />
          </button>
        </div>
        <div className="flex gap-[8px] overflow-x-auto pb-2 no-scrollbar">
          <RecentRecordCard company="테슬라" price="72,400원" status="불안 Lv. 7" type="매수" logo="🚗" color="red" />
          <RecentRecordCard company="삼성전자" price="72,400원" status="평온 Lv. 3" type="매수" logo="📱" color="blue" />
        </div>
      </section>
    </div>
  )
};
