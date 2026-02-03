import TimeLineIcon from '@/assets/icons/stats_time.svg'
import { EMOTIONS } from '@/constants/emotions';
import type { SessionType, TimelineSection } from '@/types/record';
import { useState } from 'react';
import TimeLineModal from './TimeLineModal';

interface Props {
  sections?: TimelineSection[];
  onItemClick: (recordId: number) => void;
}

const DailyRecordTimeLine = ({ sections, onItemClick }: Props) => {
  const [isTimeLineOpen, setIsTimeLineOpen] = useState(false);
  const getEmotionData = (key: string) => EMOTIONS.find((e) => e.key === key);

  const sessionMap: Record<SessionType, string> = {
    MORNING: '오전',
    AFTERNOON: '오후',
    CLOSE: '장 후',
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? '오후' : '오전';
    const displayHours = hours % 12 || 12; 
  
    return `${ampm} ${displayHours}시 ${minutes.toString().padStart(2, '0')}분`;
  };

  return (
    <section className="flex-1 flex flex-col min-h-0">
      <div className="p-[16px] pt-[40px] flex items-center gap-1 text-[16px] font-semibold text-gray-700">
        타임라인
        <button onClick={() => setIsTimeLineOpen(true)}>
          <img
            src={TimeLineIcon}
            alt="timeline icon"
            className="h-[15px] w-[15px]"
          />
        </button>
      </div>

      <div className="relative bg-white w-full rounded-t-[20px] px-[16px] pt-[20px]  min-h-[calc(100dvh-120px)] overflow-hidden flex-1 pb-[20px]">
        <div className="relative ml-[16px] border-l-[2px] border-gray-100 pl-8 flex flex-col">
          <div className="absolute -left-[17px] flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#F4F5F7] text-[11px] text-[#C5C8CE]">
            장 전
          </div>

          <div className="flex flex-col mt-[52px]">
            {sections?.map((section) => {
              if (section.session === 'CLOSE') return null;

              return (
                <div key={section.session} className="flex flex-col">
                  {section.items.map((item, index) => {
                    const emotion = getEmotionData(item.emotionCode);
                    const isFirstInSession = index === 0; // 세션의 첫 아이템에만 오전/오후 뱃지 표시
                    const emotionColor = emotion?.color || '#EEEFF0';

                    return (
                      <div key={item.recordId} className="relative">
                        <div
                          className="absolute left-[-34px] top-0 bottom-0 w-[2px]"
                          style={{ backgroundColor: emotionColor }}
                        />
                        
                        {isFirstInSession && (
                          <div className="absolute -left-[49px] top-0 flex h-[32px] w-[32px] items-center justify-center rounded-full text-[11px] font-bold text-white bg-[#278DFD] shadow-md shadow-[#007AFF26]">
                            {sessionMap[section.session]}
                          </div>
                        )}
                      
                        <div
                          className="rounded-xl border-[1.2px] border-gray-100 bg-white p-[16px] shadow-md shadow-[#DFE2E833] mb-[6px] cursor-pointer"
                          key={item.recordId}
                          onClick={() => onItemClick(item.recordId)}
                        >
                          <div className="mb-[14px] flex items-center justify-between">
                            <div className="flex items-center gap-[6px]">
                              <span className="font-semibold text-[14px] text-gray-900">{item.instrumentName}</span>
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
                            <span className="text-[12px] text-gray-300">
                              {formatTime(item.recordedAt)}
                            </span>
                          </div>
                          <p className="mb-[10px] text-[11px] leading-snug text-gray-700">"{item.memoPreview}"</p>
                          <div className="flex items-center justify-between text-[13px]">
                            <span
                              style={{ color: item.tradeAction === 'BUY' ? '#E42911' : '#065DE0' }}
                            >
                              {item.tradeAction === 'BUY' ? '매수' : '매도'}
                              <span className="text-gray-300 mx-[4px]">·</span>
                              <span className="font-semibold text-gray-500">{item.unitPrice.toLocaleString()}원</span>
                            </span>
                            <span className="text-gray-400">{item.quantity}주</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
  
          <div className="relative left-[-49px] -bottom-0 flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#F4F5F7] text-[11px] text-[#C5C8CE]">
            장 후
          </div>
          
        </div>
      </div>
      {isTimeLineOpen && (
        <TimeLineModal onClose={() => setIsTimeLineOpen(false)} />
      )}
    </section>
  );
}

export default DailyRecordTimeLine;