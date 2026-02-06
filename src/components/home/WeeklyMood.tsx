import { homeApi } from '@/apis/homeApi';
import plusIcon from '@/assets/icons/plusblue.svg';
import { EMOTIONS } from '@/constants/emotions';
import type { WeeklyMoodItem } from '@/types/emotion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeEmptyState } from './HomeEmptyState';

const DAY_ORDER: Record<string, string> = {
  MON: '월',
  TUE: '화',
  WED: '수',
  THU: '목',
  FRI: '금',
  SAT: '토',
  SUN: '일',
};

export const WeeklyMood = () => {
  const navigate = useNavigate();
  const [weekData, setWeekData] = useState<WeeklyMoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeeklyMood = async () => {
      try {
        setLoading(true);
        const res = await homeApi.getWeeklyMood();
        setWeekData(res.result?.days ?? []);
      } catch (err) {
        console.error(err);
        setError('주간 무드를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchWeeklyMood();
  }, []);

  if (error) {
    return (
      <section className="mt-[11px]">
        <h3 className="font-semibold text-[17px] mb-[16px]">위클리 무드</h3>
        <HomeEmptyState message={error} />
      </section>
    );
  }

  const getEmotionIcon = (emotionKey: string | null) => {
    if (!emotionKey) return null;
    const emotion = EMOTIONS.find((e) => e.key === emotionKey);
    return emotion ? emotion.icon : null;
  };

  return (
    <div>
      <section className="mt-[11px]">
        <h3 className="font-semibold text-[17px] mb-[16px]">위클리 무드</h3>
        <div className="flex justify-between bg-white p-[13px] rounded-xl shadow-[#DFE2E81A] shadow-sm relative overflow-hidden">
          <div className="flex flex-1 overflow-x-auto scrollbar-hide pr-2 relative">
            {weekData.map((day) => (
              <div key={day.dayOfWeek} className="flex items-center cursor-pointer">
                <div className="flex flex-col items-center justify-between min-w-[50px] h-[72px] bg-[#E9EBEE75] rounded-md py-2 relative">
                  <div className="flex items-center justify-center flex-1">
                    {loading ? (
                      <div className="w-[22px] h-[22px] rounded-full border-[1px] border-dashed border-gray-300 animate-pulse" />
                    ) : day.hasRecord && day.emotion && getEmotionIcon(day.emotion) ? (
                      <img
                        src={getEmotionIcon(day.emotion)!}
                        alt={day.emotion}
                        className="w-[22px] h-[22px]"
                      />
                    ) : (
                      <div className="w-[22px] h-[22px] rounded-full border-[1px] border-dashed border-gray-300" />
                    )}
                  </div>
                  <span className="text-[12px] mb-[4px] text-[#4E5660CC]">{DAY_ORDER[day.dayOfWeek]}</span>
                </div>

                {day.dayOfWeek !== 'SUN' && (
                  <div className="w-[1.2px] h-[65px] mx-[6px] bg-gradient-to-b from-[#E4E8F01F] via-[#E4E8F0] to-[#E4E8F01F]" />
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center relative z-10">
            <button
              className="ml-0.5 min-w-[31px] h-[43px] bg-blue-bg rounded-lg flex items-center justify-center z-10 cursor-pointer"
              onClick={() => navigate('/record')}
            >
              <img src={plusIcon} alt="기분 추가 아이콘" className="w-[14px] h-[14px]" />
            </button>
          </div>

          <div
            className="absolute top-[13px] bottom-[13px] right-[44px] w-[80px] pointer-events-none"
            style={{
              background: 'linear-gradient(to right, transparent, white)'
            }}
          />
        </div>
      </section>
    </div>
  );
};
