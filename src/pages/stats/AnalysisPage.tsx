import Close from '@/assets/icons/stats_close.svg';
import CalIcon from '@/assets/icons/stats_cal.svg';
import WCalIcon from '@/assets/icons/stats_cal_w.svg';
import AnalysisChart from '@/components/stats/AnalysisChart';
import AnalysisCard from '@/components/stats/AnalysisCard';
import FinlyTalk from '@/components/FinlyTalk';
import SelectDateModal from '@/components/stats/SelectDateModal';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { getTodayString, formatDateDisplay } from '@/utils/date';
import NoIcon from '@/assets/images/stats_no_card_icon.svg';
import { useStatsStore } from '@/store/statsStockStore';
import { useHourlyChart } from '@/hooks/useStatsAnalysis';
import { apiRenderGuard } from '@/utils/renderGuard';
import type { AnalysisDetailResult } from '@/types/stats';

const AnalysisPage = () => {
  const navigate = useNavigate();
  const { currentStock } = useStatsStore();
  const [targetDate, setTargetDate] = useState(getTodayString());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);

  const { data, isLoading, isError } = useHourlyChart(
    currentStock?.symbol,
    targetDate,
  );

  const chartData = useMemo(() => {
    if (!data?.prices) return [];

    return data.prices.map((p) => {
      const priceTime = p.dateTime.split(' ')[1]?.substring(0, 5);

      if (!priceTime) return { time: '', closePrice: p.price, record: null };

      const record = data.records?.find((r) => {
        const recordTime = r.recordDateTime?.split(' ')[1]?.substring(0, 5);
        return recordTime === priceTime;
      });

      return {
        time: priceTime,
        closePrice: p.price,
        record: record || null,
      };
    });
  }, [data]);

  useEffect(() => {
    const latestFromChart = [...chartData]
      .reverse()
      .find((d) => d.record !== null);

    if (latestFromChart) {
      setSelectedData(latestFromChart);
    } else if (data?.records && data.records.length > 0) {
      const lastRecord = data.records[data.records.length - 1];
      const timePart =
        lastRecord.recordDateTime?.split(' ')[1]?.substring(0, 5) || '';
      setSelectedData({
        time: timePart,
        closePrice: 0,
        record: lastRecord,
      });
    } else {
      setSelectedData(null);
    }
  }, [chartData, data]);

  if (isLoading) {
    return (
      <div className="flex w-full flex-1 flex-col bg-white">
        <header className="relative flex h-[60px] w-full flex-row items-center justify-center border-b border-gray-100 pt-4">
          <div className="px-4 text-[18px] font-semibold text-gray-900">
            심층 분석
          </div>
          <img
            src={Close}
            alt="닫기"
            className="absolute right-4 w-[16px]"
            onClick={() => navigate(-1)}
          />
        </header>
        <div className="flex flex-1 flex-col items-center justify-center pb-20">
          <div className="flex flex-col items-center gap-4">
            <div className="border-t-secondary h-10 w-10 animate-spin rounded-full border-4 border-gray-200" />
            <p className="text-sm font-medium text-gray-500">
              심층 분석 그래프를 그리고 있어요...
            </p>
          </div>
        </div>
      </div>
    );
  }
  const guardUI = apiRenderGuard(false, isError, data);
  if (guardUI !== undefined) return guardUI;

  const analysisData = data as AnalysisDetailResult;
  const hasRecords = analysisData.records && analysisData.records.length > 0;

  return (
    <div className="flex w-full flex-1 flex-col">
      <header className="relative flex h-[60px] w-full flex-row items-center justify-center border-b border-gray-100 pt-4">
        <div className="px-4 text-[18px] font-semibold text-gray-900">
          심층 분석
        </div>
        <img
          src={Close}
          alt="닫기"
          className="absolute right-4 h-auto w-[16px]"
          onClick={() => navigate(-1)}
        />
      </header>
      <div className="relative w-full">
        <button
          onClick={() => setIsCalendarOpen(true)}
          className="absolute top-5 left-5 z-10 flex items-center gap-1.5 rounded-[6px] bg-gray-100/80 px-2 py-1.5"
        >
          <img src={CalIcon} alt="캘린더" className="w-[11px]" />
          <span className="text-[11px] text-gray-500">
            {formatDateDisplay(targetDate)} · {analysisData.stockName}
          </span>
        </button>
        <AnalysisChart data={chartData} onDataSelect={setSelectedData} />
      </div>
      {hasRecords && selectedData ? (
        <>
          <AnalysisCard data={selectedData} />
          {selectedData.record && (
            <FinlyTalk
              recordId={selectedData.record.recordId}
              content={selectedData.record.finlyTalk}
              status="COMPLETED"
            />
          )}
        </>
      ) : (
        <div className="mt-11.25 flex flex-col items-center gap-11.5 px-4">
          <div className="flex flex-col items-center gap-2">
            <img
              className="h-[26px] w-[29px]"
              src={NoIcon}
              alt="기록 없음 아이콘"
            />
            <div className="text-[14px] font-medium text-gray-300">
              해당 일에 기록된 조각이 없어요
            </div>
          </div>
          <button
            onClick={() => setIsCalendarOpen(true)}
            className="bg-secondary flex items-center justify-center gap-1.5 rounded-[8px] px-3 py-2"
          >
            <img src={WCalIcon} alt="캘린더" className="w-[12px]" />
            <span className="text-[14px] font-semibold text-white">
              다른 날짜 선택
            </span>
          </button>
        </div>
      )}
      <SelectDateModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        selectedDate={targetDate}
        onDateSelect={(date) => setTargetDate(date)}
      />
    </div>
  );
};

export default AnalysisPage;
