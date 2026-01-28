import Close from '@/assets/icons/stats_close.svg';
import CalIcon from '@/assets/icons/stats_cal.svg';
import WCalIcon from '@/assets/icons/stats_cal_w.svg';
import AnalysisChart from '@/components/stats/AnalysisChart';
import AnalysisCard from '@/components/stats/AnalysisCard';
import AnalysisAI from '@/components/stats/AnalysisAI';
import SelectDateModal from '@/components/stats/SelectDateModal';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getTodayString, formatDateDisplay } from '@/utils/date';
import NoIcon from '@/assets/images/stats_no_card_icon.svg';

// 예시 데이터(연동 시 삭제 및 타입 정의 예정)
const DUMMY_RESPONSE = {
  isSuccess: true,
  code: 'ANALYSIS_GRAPH_DETAIL200',
  message: '주가-감정 상세 그래프 데이터를 정상적으로 조회했습니다.',
  result: {
    stockId: 123,
    stockCode: '005930',
    stockName: '삼성전자',
    currentDateTime: '2026-01-27 15:30',
    targetDate: '2026-01-27',
    pricePoints: [
      { time: '09:00', closePrice: 69000 },
      { time: '09:05', closePrice: 69500 }, // 1차 기록 (매수)
      { time: '09:10', closePrice: 69800 },
      { time: '09:15', closePrice: 70100 },
      { time: '09:20', closePrice: 70300 },
      { time: '09:25', closePrice: 70400 },
      { time: '09:30', closePrice: 70600 },
      { time: '09:35', closePrice: 70800 },
      { time: '09:40', closePrice: 70900 },
      { time: '09:45', closePrice: 71100 },
      { time: '09:50', closePrice: 71200 },
      { time: '09:55', closePrice: 71350 },
      { time: '10:00', closePrice: 71500 },
      { time: '10:05', closePrice: 71600 },
      { time: '10:10', closePrice: 71700 },
      { time: '10:15', closePrice: 71750 },
      { time: '10:20', closePrice: 71800 },
      { time: '10:25', closePrice: 71850 },
      { time: '10:30', closePrice: 71900 }, // 2차 기록 (홀딩 - 확신)
      { time: '10:35', closePrice: 72000 },
      { time: '10:40', closePrice: 72100 },
      { time: '10:45', closePrice: 72050 },
      { time: '10:50', closePrice: 71950 },
      { time: '10:55', closePrice: 71900 },
      { time: '11:00', closePrice: 71850 },
      { time: '11:05', closePrice: 71900 },
      { time: '11:10', closePrice: 71950 },
      { time: '11:15', closePrice: 72000 },
      { time: '11:20', closePrice: 72100 },
      { time: '11:25', closePrice: 72150 },
      { time: '11:30', closePrice: 72100 },
      { time: '11:35', closePrice: 72000 },
      { time: '11:40', closePrice: 71900 },
      { time: '11:45', closePrice: 71800 },
      { time: '11:50', closePrice: 71700 },
      { time: '11:55', closePrice: 71600 },
      { time: '12:00', closePrice: 71500 },
      { time: '12:05', closePrice: 71400 },
      { time: '12:10', closePrice: 71300 },
      { time: '12:15', closePrice: 71200 },
      { time: '12:20', closePrice: 71100 },
      { time: '12:25', closePrice: 71000 },
      { time: '12:30', closePrice: 70950 },
      { time: '12:35', closePrice: 70900 },
      { time: '12:40', closePrice: 70850 },
      { time: '12:45', closePrice: 70800 },
      { time: '12:50', closePrice: 70850 },
      { time: '12:55', closePrice: 70880 },
      { time: '13:00', closePrice: 70900 }, // 3차 기록 (매도)
      { time: '13:05', closePrice: 70950 },
      { time: '13:10', closePrice: 71000 },
      { time: '13:15', closePrice: 71050 },
      { time: '13:20', closePrice: 71100 },
      { time: '13:25', closePrice: 71150 },
      { time: '13:30', closePrice: 71200 },
      { time: '13:35', closePrice: 71250 },
      { time: '13:40', closePrice: 71300 },
      { time: '13:45', closePrice: 71350 },
      { time: '13:50', closePrice: 71400 },
      { time: '13:55', closePrice: 71450 },
      { time: '14:00', closePrice: 71500 },
      { time: '14:05', closePrice: 71550 },
      { time: '14:10', closePrice: 71600 },
      { time: '14:15', closePrice: 71650 },
      { time: '14:20', closePrice: 71700 },
      { time: '14:25', closePrice: 71750 },
      { time: '14:30', closePrice: 71800 },
      { time: '14:35', closePrice: 71850 },
      { time: '14:40', closePrice: 71900 },
      { time: '14:45', closePrice: 71950 },
      { time: '14:50', closePrice: 72000 },
      { time: '14:55', closePrice: 72050 },
      { time: '15:00', closePrice: 72100 },
      { time: '15:05', closePrice: 72150 },
      { time: '15:10', closePrice: 72200 },
      { time: '15:15', closePrice: 72250 },
      { time: '15:20', closePrice: 72300 },
      { time: '15:25', closePrice: 72350 },
      { time: '15:30', closePrice: 72400 },
    ],
    records: [
      {
        recordId: 1001,
        recordedAt: '2026-01-27T09:05:12', // 09:05
        emotion: 'ANXIETY',
        emotionIntensity: 4,
        tradeAction: 'BUY',
        quantity: 10,
        pricePerShare: 69500,
        totalPrice: 695000,
        memo: '장 시작하자마자 뚝 떨어지길래 너무 불안해서 물타기함. 더 떨어지면 어떡하지?',
        aiFeedback:
          '불안감을 느끼면서도 매수 원칙을 지키려 노력하신 점이 돋보입니다. 다만...',
      },
      {
        recordId: 1002,
        recordedAt: '2026-01-27T10:30:45', // 10:30
        emotion: 'CONFIDENCE',
        emotionIntensity: 5,
        tradeAction: 'HOLD',
        quantity: null,
        totalPrice: null,
        pricePerShare: null,
        memo: '역시 반등할 줄 알았어. 거래량 터지는 거 보니까 오늘은 72,000원 뚫을 듯. 홀딩!',
        aiFeedback:
          '시장의 흐름을 읽고 확신을 가진 점이 훌륭합니다. 예측이 적중했을 때의...',
      },
      {
        recordId: 1003,
        recordedAt: '2026-01-27T13:00:20', // 13:00
        emotion: 'REGRET',
        emotionIntensity: 3,
        tradeAction: 'SELL',
        quantity: 5,
        totalPrice: 354500,
        pricePerShare: 70900,
        memo: '아까 12시에 고점에서 팔았어야 했는데... 욕심 부리다가 타이밍 놓침. 일단 일부 익절.',
        aiFeedback:
          '최고점을 놓친 아쉬움이 크시겠지만, 분할 매도로 리스크를 관리한 것은 현명한 선택입니다.',
      },
    ],
  },
};

const AnalysisPage = () => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState<any[]>([]);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [targetDate, setTargetDate] = useState(getTodayString());
  const [hasRecords, setHasRecords] = useState(false);

  useEffect(() => {
    const { pricePoints, records } = DUMMY_RESPONSE.result;

    const processedData = pricePoints.map((point: any) => ({
      time: point.time,
      closePrice: point.closePrice,
      record: null,
    }));

    // API 연동 시 수정할 예정
    const isSameDate = targetDate === DUMMY_RESPONSE.result.targetDate;
    const currentRecords = isSameDate ? records : [];

    if (currentRecords && currentRecords.length > 0) {
      currentRecords.forEach((record: any) => {
        const recordTime = record.recordedAt.split('T')[1].substring(0, 5);
        const targetPoint = processedData.find(
          (p: any) => p.time === recordTime,
        );

        if (targetPoint) {
          targetPoint.record = record;
        }
      });
      setHasRecords(true);
    } else {
      setHasRecords(false);
    }

    setChartData(processedData);

    if (processedData.length > 0) {
      if (currentRecords.length > 0) {
        const latestRecordData = [...processedData]
          .reverse()
          .find((item) => item.record !== null);
        setSelectedData(
          latestRecordData || processedData[processedData.length - 1],
        );
      } else {
        setSelectedData(processedData[processedData.length - 1]);
      }
    }
  }, [targetDate]);

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
            {formatDateDisplay(targetDate)} · {DUMMY_RESPONSE.result.stockName}
          </span>
        </button>
        <AnalysisChart data={chartData} onDataSelect={setSelectedData} />
      </div>
      {hasRecords ? (
        <>
          <AnalysisCard data={selectedData} />
          <AnalysisAI />
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
        onDateSelect={(date) => {
          setTargetDate(date);
          console.log('새로운 날짜 선택:', date);
        }}
      />
    </div>
  );
};

export default AnalysisPage;
