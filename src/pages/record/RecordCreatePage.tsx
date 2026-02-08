import React, { useState, useRef, useEffect } from 'react';
import CloseHeader from '@/components/record/CloseHeader';
import RecordSearch from '@/assets/icons/record_search3.svg';
import type { EmotionType, TradeActionType } from '@/types/record';
import TradeDetailInput from '@/components/record/TradeDetailInput';
import EmotionFilterButton from '@/components/record/EmotionFilterButton';
import { EMOTIONS } from '@/constants/emotions';
import EmotionLevelSlider from '@/components/record/EmotionLevelSlider';
import Button from '@/components/record/Button';
import MiniCalendar from '@/components/record/MiniCalendar';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '@/components/record/Modal';
import { useCreateRecord } from '@/hooks/mutations/useCreateRecord';
import { useRecordCreateStore } from '@/store/recordCreateStore';
import { useUpdateRecord } from '@/hooks/mutations/useUpdateRecord';
import { useRecordDetail } from '@/hooks/useRecordDetail';
import { stockInfoStore } from '@/store/stockInfoStore';

const RecordCreatePage = () => {
  const navigate = useNavigate();
  const { recordId } = useParams<{ recordId: string }>();
  const isEditMode = !!recordId;
  const numericId = Number(recordId);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isReady, setIsReady] = useState(false);

  const stockMap = stockInfoStore((state) => state.stockMap);

  const {
    selectedDate,
    stockId,
    stockName,
    symbol,
    selectedTradeAction,
    unitPrice,
    quantity,
    clickedEmotion,
    emotionLevel,
    memo,
    setField,
    reset,
  } = useRecordCreateStore();

  const { data: detail, isLoading: isDetailLoading } = useRecordDetail(
    isEditMode ? numericId : undefined,
  );

  const { mutate: createMutate, isPending: isCreatePending } =
    useCreateRecord();
  const { mutate: updateMutate, isPending: isUpdatePending } =
    useUpdateRecord(numericId);

  const isPending = isCreatePending || isUpdatePending;
  const isToday = selectedDate?.toDateString() === new Date().toDateString();

  useEffect(() => {
    if (isEditMode && detail && !isReady) {
      const name = stockMap[detail.symbol]?.name || detail.symbol;

      setField('selectedDate', new Date(detail.recordDate));
      setField('symbol', detail.symbol);
      setField('stockName', name);
      setField('stockId', 999);
      setField('selectedTradeAction', detail.tradeAction);
      setField('unitPrice', String(detail.unitPrice));
      setField('quantity', String(detail.quantity));
      setField('clickedEmotion', detail.emotionCode);
      setField('emotionLevel', detail.emotionIntensity);
      setField('memo', detail.memo);

      setIsReady(true);
    }
  }, [isEditMode, detail, setField, stockMap, isReady]);

  const handleDateSelect = (date: Date) => {
    setField('selectedDate', date);
    setIsCalendarOpen(false);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '날짜 선택';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const toggleToday = () => {
    if (!isToday) {
      const today = new Date();
      setField('selectedDate', today);
      setIsCalendarOpen(false);
    } else {
      setField('selectedDate', null);
    }
  };

  const tradeActions: { id: TradeActionType; label: string }[] = [
    { id: 'BUY', label: '매수' },
    { id: 'SELL', label: '매도' },
    { id: 'WATCH', label: '관망' },
  ];

  const handleMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 200) {
      setField('memo', value);
      handleTextareaHeight();
    }
  };

  const handleTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = '74px';
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = scrollHeight > 74 ? `${scrollHeight}px` : '74px';
    }
  };

  useEffect(() => {
    handleTextareaHeight();
  }, [memo]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };
    if (isCalendarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCalendarOpen]);

  const isButtonDisabled =
    !selectedDate ||
    !stockId ||
    !symbol ||
    !selectedTradeAction ||
    (selectedTradeAction !== 'WATCH' && (!unitPrice || !quantity)) ||
    !clickedEmotion ||
    emotionLevel === null ||
    memo.trim().length === 0;

  const handleSubmit = () => {
    if (isButtonDisabled || isPending) return;

    const data = {
      recordDate: formatDate(selectedDate),
      symbol: symbol!,
      tradeAction: selectedTradeAction!,
      unitPrice: selectedTradeAction === 'WATCH' ? 0 : Number(unitPrice),
      quantity: selectedTradeAction === 'WATCH' ? 0 : Number(quantity),
      emotionCode: clickedEmotion as EmotionType,
      emotionIntensity: emotionLevel!,
      memo: memo.trim(),
    };

    if (isEditMode) {
      updateMutate(data);
    } else {
      createMutate({
        ...data,
        clientRequestId: self.crypto.randomUUID(),
      });
    }
  };

  if (isEditMode && isDetailLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <CloseHeader
        title={isEditMode ? '기록 수정하기' : '기록하기'}
        border={false}
        desc="지금 내 투자 마음은 어떤가요?"
        onClick={() => setIsModalOpen(true)}
      />
      <div className="mt-24 flex flex-col px-4">
        <div className="mt-7.5 flex flex-col gap-4">
          <h3 className="text-secondary text-sm font-bold">STEP1</h3>
          <div className="flex gap-[11px]">
            <div className="relative flex-1" ref={calendarRef}>
              <button
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                className={`flex h-12.5 w-full cursor-pointer items-center rounded-xl border-[1.2px] border-gray-100/60 bg-gray-50/60 px-[15px] ${
                  selectedDate ? 'border-secondary' : 'border-gray-100'
                }`}
              >
                <p
                  className={`text-[15px] ${selectedDate ? 'text-gray-900' : 'text-gray-500/80'}`}
                >
                  {selectedDate ? formatDate(selectedDate) : '날짜 선택'}
                </p>
              </button>
              {isCalendarOpen && (
                <div className="animate-in fade-in slide-in-from-top-2 absolute left-0 z-20 w-full duration-200">
                  <MiniCalendar
                    selectedDate={selectedDate}
                    onSelect={handleDateSelect}
                  />
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isToday}
                onChange={toggleToday}
                className="checked:border-secondary checked:bg-secondary h-4.5 w-4.5 cursor-pointer appearance-none rounded-sm border-[1.2px] border-gray-100/60 bg-gray-50/60"
              />
              <p className="font-[15px] text-gray-500">Today</p>
            </div>
          </div>
        </div>
        <div className="mt-7.5 flex flex-col">
          <h3 className="text-secondary text-sm font-bold">STEP2</h3>
          <button
            onClick={() => {
              const searchPath = isEditMode
                ? `/stock/search?recordId=${recordId}`
                : '/stock/search';
              navigate(searchPath);
            }}
            className={`my-4 flex h-12.5 w-full cursor-pointer items-center justify-between rounded-xl border-[1.2px] bg-gray-50/60 px-[15px] ${
              stockName ? 'border-secondary' : 'border-gray-100'
            }`}
          >
            {stockName ? (
              <div className="text-[15px] text-gray-900">{stockName}</div>
            ) : (
              <>
                <p className="text-[15px] text-gray-500/60">
                  종목명 검색 (예: 삼성전자)
                </p>
                <img src={RecordSearch} alt="검색 아이콘" />
              </>
            )}
          </button>
          <div className="flex gap-3.5">
            {tradeActions.map((tradeAction) => (
              <button
                key={tradeAction.id}
                onClick={() => setField('selectedTradeAction', tradeAction.id)}
                className={`h-[39px] w-full cursor-pointer rounded-lg border text-sm transition-all ${
                  selectedTradeAction === tradeAction.id
                    ? `${
                        tradeAction.id === 'BUY'
                          ? 'bg-stock-buy'
                          : tradeAction.id === 'SELL'
                            ? 'bg-stock-sell'
                            : 'bg-gray-500'
                      } border-transparent font-semibold text-white`
                    : 'border-[1.2px] border-gray-100 bg-gray-50/60 font-normal text-gray-700'
                }`}
              >
                {tradeAction.label}
              </button>
            ))}
          </div>
          <div
            className={`grid transition-all duration-300 ease-in-out ${
              selectedTradeAction === 'BUY' || selectedTradeAction === 'SELL'
                ? 'mt-4 translate-y-0 grid-rows-[1fr] opacity-100'
                : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              <div className="flex gap-6 rounded-xl border-[1.2px] border-gray-100 bg-gray-50/60 p-4">
                {(!isEditMode || isReady) && (
                  <>
                    <TradeDetailInput
                      title="거래 단가"
                      value={unitPrice ? Number(unitPrice) : undefined}
                      unit="원"
                      onChange={(value) => setField('unitPrice', value)}
                    />
                    <TradeDetailInput
                      title="거래 수량"
                      value={quantity ? Number(quantity) : undefined}
                      unit="주"
                      onChange={(value) => setField('quantity', value)}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-7.5 flex flex-col">
          <h3 className="text-secondary text-sm font-bold">STEP3</h3>
          <p className="my-4 text-[15px] font-semibold">
            어떤 감정이 가장 강한가요?
          </p>
          <div className="flex justify-between">
            {EMOTIONS.map((emotion) => (
              <EmotionFilterButton
                key={emotion.key}
                label={emotion.label}
                icon={emotion.icon}
                isSelected={clickedEmotion === emotion.key}
                onClick={() => {
                  setField('clickedEmotion', emotion.key);
                  setField('emotionLevel', 7);
                }}
              />
            ))}
          </div>
          <EmotionLevelSlider
            level={emotionLevel ?? 7}
            onChange={(val) => setField('emotionLevel', val)}
            isVisible={clickedEmotion !== null}
          />
        </div>
        <div
          className={`mb-[150px] flex flex-col ${clickedEmotion !== null ? 'mt-5' : 'mt-7.5'}`}
        >
          <h3 className="text-secondary mb-4 text-sm font-bold">STEP4</h3>
          <textarea
            value={memo || ''}
            onChange={handleMemo}
            maxLength={200}
            spellCheck={false}
            placeholder={
              '왜 그런 감정이 들었나요? 당시 상황을 짧게 적어주세요.\n(AI 분석에 활용돼요)'
            }
            className={`scrollbar-hide h-[74px] resize-none overflow-y-auto rounded-xl border-[1.2px] bg-gray-50/60 p-4 text-sm whitespace-pre-line outline-none placeholder:text-gray-500/80 ${
              memo.length > 0 ? 'border-secondary' : 'border-gray-100/60'
            }`}
            ref={textareaRef}
          />
          {memo.length > 0 && (
            <div className="mt-1 flex justify-end text-[11px]">
              <p className="text-secondary">{memo.length}</p>
              <p className="text-gray-300">/200</p>
            </div>
          )}
        </div>
      </div>
      <div className="fixed right-0 bottom-0 left-0 z-1 mx-auto max-w-120">
        <div className="bg-white/60 px-4 pt-2 pb-13 backdrop-blur-[5px]">
          <Button
            text={isEditMode ? '수정 완료' : '완료'}
            onClick={handleSubmit}
            disabled={isButtonDisabled || isPending}
          />
        </div>
      </div>
      {isModalOpen && (
        <Modal
          text={isEditMode ? '수정을 취소할까요?' : '기록을 취소할까요?'}
          desc="작성된 내용은 저장되지 않아요"
          onClickLeft={() => {
            reset();
            navigate('/record');
          }}
          onClickRight={() => setIsModalOpen(false)}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default RecordCreatePage;
