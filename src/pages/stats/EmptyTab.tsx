import PlusIcon from '@/assets/icons/stats_plus.svg';

interface Props {
  status: 'LOADING' | 'EMPTY';
}

const EmptyTab = ({ status }: Props) => {
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-6 px-4">
      {status === 'LOADING' ? (
        <div className="mt-[136px] flex flex-col items-center gap-2 text-[14px] font-semibold text-gray-300">
          통계 화면을 생성 중이에요
          <div className="text-[12px] font-semibold text-gray-300">
            남은 기록: 1개
          </div>
        </div>
      ) : (
        <div className="mt-[147px] text-[14px] font-semibold text-gray-300">
          3개 이상 기록 시 통계 탭 이용이 가능해요
        </div>
      )}
      <div className="bg-secondary content-fit flex items-center justify-center rounded-[8px] px-3 py-2">
        <img src={PlusIcon} alt="기록 추가" className="mr-1 w-[12px]" />
        <div className="text-[14px] font-semibold text-white">기록하기</div>
      </div>
    </div>
  );
};

export default EmptyTab;
