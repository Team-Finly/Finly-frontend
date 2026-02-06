import TimeLineIcon from '@/assets/icons/stats_time.svg';
import { EMOTIONS } from '@/constants/emotions';
import type { PrismFeedback, SessionType, TimelineSummaryItem } from '@/types/record';
import { useMemo, useState } from 'react';
import TimeLineModal from '@/components/record/TimeLineModal';
import { stockInfoStore } from '@/store/stockInfoStore';

interface Props {
  timelineSummary: TimelineSummaryItem[];
  prismFeedback: PrismFeedback;
  hasRecords: boolean;
  onItemClick: (recordId: number) => void;
}

const DailyRecordTimeLine = ({ timelineSummary, prismFeedback, hasRecords, onItemClick }: Props) => {
  const [isTimeLineOpen, setIsTimeLineOpen] = useState(false);
  const getEmotionData = (key: string) => EMOTIONS.find((e) => e.key === key);
  const { stockMap } = stockInfoStore();
  
  const sessions: SessionType[] = ['PRE_MARKET', 'MORNING', 'AFTERNOON', 'POST_MARKET'];

  const sessionMap: Record<SessionType, string> = {
    PRE_MARKET: '장 전',
    MORNING: '오전',
    AFTERNOON: '오후',
    POST_MARKET: '장 후',
  };

  const groupedBySession = useMemo(() => {
    return timelineSummary.reduce<Record<SessionType, TimelineSummaryItem[]>>(
      (acc, item) => {
        acc[item.session] ??= [];
        acc[item.session].push(item);
        return acc;
      },
      {
        PRE_MARKET: [],
        MORNING: [],
        AFTERNOON: [],
        POST_MARKET: [],
      }
    );
  }, [timelineSummary]);

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? '오후' : '오전';
    const displayHours = hours % 12 || 12;
    return `${ampm} ${displayHours}시 ${minutes.toString().padStart(2, '0')}분`;
  };

  const getSessionStyle = (session: SessionType) => {
    const hasItems = groupedBySession[session].length > 0;

    return {
      hasItems,
      backgroundColor: hasItems ? '#278DFD' : '#F4F5F7',
      textColor: hasItems ? 'text-white' : 'text-[#C5C8CE]',
      shadow: hasItems ? 'shadow-md shadow-[#007AFF26]' : '',
    };
  };

  return (
    <section className="flex flex-col">
      <div className="flex items-center gap-1 p-[16px] pt-[40px] text-[16px] font-semibold text-gray-700">
        타임라인
        <button onClick={() => setIsTimeLineOpen(true)}>
          <img src={TimeLineIcon} alt="timeline icon" className="h-[15px] w-[15px]" />
        </button>
      </div>

      <div className="relative w-full flex-1 rounded-t-[20px] bg-white px-[16px] pt-[20px] pb-[20px]">
        {hasRecords ? (
          <div className="relative ml-[16px] flex flex-col pl-8">
            <div className="flex flex-col">
              {sessions.map((sessionKey, index) => {
                const items = groupedBySession[sessionKey];
                const style = getSessionStyle(sessionKey);
                const isLast = index === sessions.length - 1;

                return (
                  <div key={sessionKey} className="relative flex flex-col">
                    {/* 회색 배경 선 */}
                    {!isLast && (
                      <div className="absolute left-[-34px] top-[32px] bottom-[-6px] w-[2px] bg-gray-100" />
                    )}

                    {/* 세션 배지 */}
                    <div
                      className={`absolute -left-[49px] top-0 z-20 flex h-[32px] w-[32px] items-center justify-center rounded-full text-[11px] ${style.textColor} ${style.shadow}`}
                      style={{
                        backgroundColor: style.backgroundColor,
                        fontWeight: style.hasItems ? 'bold' : 'normal',
                      }}
                    >
                      {sessionMap[sessionKey]}
                    </div>

                    {/* 아이템 리스트 */}
                    <div className="flex flex-col gap-[6px] pb-[6px]">
                      {items.length > 0 ? (
                        items.map((item) => {
                          const emotion = getEmotionData(item.emotionCode);
                          const emotionColor = emotion?.color || '#EEEFF0';
                          const stock = stockMap[item.symbol];

                          return (
                            <div key={item.recordId} className="relative first:min-h-[32px]">
                              {/* 감정 색상 선 */}
                              <div
                                className="absolute bottom-[-6px] left-[-34px] top-0 z-10 w-[2px]"
                                style={{ backgroundColor: emotionColor }}
                              />
                              <div
                                className="rounded-xl border-[1.2px] border-gray-100 bg-white p-[16px] shadow-sm cursor-pointer"
                                onClick={() => onItemClick(item.recordId)}
                              >
                                <div className="mb-[14px] flex items-center justify-between">
                                  <div className="flex items-center gap-[6px]">
                                    <span className="text-[14px] font-semibold text-gray-900">
                                      {stock?.name || '로딩 중...'}
                                    </span>
                                    {emotion && (
                                      <div
                                        className="flex items-center gap-1 rounded-full px-[7px] py-[3px] text-[11px] font-semibold"
                                        style={{ backgroundColor: emotion.bgColor, color: emotion.color }}
                                      >
                                        <img src={emotion.icon} alt={emotion.label} className="h-[12px] w-[12px]" />
                                        {emotion.label}
                                      </div>
                                    )}
                                  </div>
                                  <span className="text-[12px] text-gray-300">{formatTime(item.recordedAt)}</span>
                                </div>
                                <p className="mb-[10px] text-[11px] leading-snug text-gray-700">"{item.memo}"</p>
                                <div className="flex items-center justify-between text-[13px]">
                                  <span
                                    style={{
                                      color:
                                        item.tradeAction === 'BUY'
                                          ? '#E42911'
                                          : item.tradeAction === 'SELL'
                                            ? '#065DE0'
                                            : '#6E757D',
                                    }}
                                  >
                                    {item.tradeAction === 'BUY' && '매수'}
                                    {item.tradeAction === 'SELL' && '매도'}
                                    {item.tradeAction === 'WATCH' && '관망'}
    
                                    <span className="mx-[4px] text-gray-300">·</span>
    
                                    <span className="font-semibold text-[#6E757D]">
                                      {item.tradeAction === 'WATCH'
                                        ? '-'
                                        : `${item.unitPrice.toLocaleString()}원`}
                                    </span>
                                  </span>

                                  <span className="text-gray-400">
                                    {item.tradeAction === 'WATCH' ? '' : `${item.quantity}주`}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        /* 기록이 없을 때  */
                        <div className="h-[52px]" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex min-h-[260px] items-center justify-center px-10 text-center">
            <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-gray-400">
              {prismFeedback.title}
            </p>
          </div>
        )}
      </div>
      {isTimeLineOpen && <TimeLineModal onClose={() => setIsTimeLineOpen(false)} />}
    </section>
  );
};

export default DailyRecordTimeLine;