import { useNavigate } from 'react-router-dom';
import RecordSearch1 from '@/assets/icons/record_search1.svg';
import FGI from '@/assets/images/fgi.png';
import ArrowRightThin from '@/assets/icons/arrow-right-thin.svg';
import Calendar from '@/components/record/Calendar';
import LinearBar from '@/components/record/LinearBar';
import EmptyFragment from '@/components/record/EmptyFragment';
import RecordFragment from '@/components/record/RecordFragment';
import FloatingButton from '@/components/record/FloatingButton';
import { useFragmentSummary } from '@/hooks/useFragmentSummary';
import { useTodayRecords } from '@/hooks/useTodayRecords';
import { getTodayString } from '@/utils/date';

const RecordHomePage = () => {
  const navigate = useNavigate();
  const { data: fragmentSummary } = useFragmentSummary();
  const today = getTodayString();
  const { data: dailyDetail } = useTodayRecords(today);
  console.log(dailyDetail)

  return (
    <div>
      <div>
        <div className="sticky top-0 z-1 bg-white">
          <div className="h-4 w-full bg-white" />
          <div className="flex h-15 w-full items-center justify-between bg-white px-4 text-gray-900">
            <h1 className="text-xl font-semibold">기록</h1>
            <button
              className="cursor-pointer"
              onClick={() => navigate('/search')}
            >
              <img src={RecordSearch1} alt="검색 아이콘" />
            </button>
          </div>
        </div>
        <div className="bg-gray-50 px-4 pt-2 pb-4">
          <div className="mb-2 flex items-center justify-between rounded-[22.5px] bg-white pr-4 pl-2">
            <div className="flex h-9.5 items-center gap-2">
              <img className="w-6" src={FGI} alt="공포탐욕 지수 아이콘" />
              <p className="text-[13px] text-gray-700">공포탐욕 지수(FGI)</p>
            </div>
            <div className="flex gap-1 text-[13px] text-gray-700">
              <p className="font-semibold">87%</p>
              <p>탐욕</p>
            </div>
          </div>
          <Calendar />
        </div>
        <div className="px-4">
          <h2 className="mt-5 mb-5.5 text-[17px] font-semibold">
            총{' '}
            <span className="text-secondary">
              {fragmentSummary?.totalCount ?? 0}
            </span>
            개의 마음 조각을 모았어요!
          </h2>
          <LinearBar emotions={fragmentSummary?.typeSummary || []} />
        </div>
        <div className="h-4 bg-gray-50"></div>
        <div className="mt-5 mb-[102px] px-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[17px] font-semibold text-gray-900">
              TODAY 마음 조각
            </h2>
            {dailyDetail?.hasRecords && (
              <button
                className="flex cursor-pointer items-center gap-0.75"
                onClick={() => navigate(`/record/${today}`)}
              >
                <p className="text-[13px] text-gray-500">전체 보기</p>
                <img src={ArrowRightThin} alt="전체 보기" />
              </button>
            )}
          </div>
          {dailyDetail?.timelineSummary &&
            dailyDetail.timelineSummary.length > 0 ? (
            <div className="flex flex-col gap-1.5">
              {dailyDetail.timelineSummary.map(item => (
                <RecordFragment key={item.recordId} data={item} />
              ))}
            </div>
          ) : (
            <EmptyFragment />
          )}
        </div>
      </div>
      <FloatingButton />
    </div>
  );
};

export default RecordHomePage;
