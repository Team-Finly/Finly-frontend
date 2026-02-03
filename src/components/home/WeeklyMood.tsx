import plusIcon from '@/assets/icons/plusblue.svg';
import { useNavigate } from 'react-router-dom';

export const WeeklyMood = () => {
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const moodData = { '월': '😓' };
  const navigate = useNavigate();

  return (
    <div>
      <section className="mt-[11px]">
        <h3 className="font-semibold text-[17px] mb-[16px]">위클리 무드</h3>
        <div className="flex justify-between bg-white p-[13px] rounded-xl shadow-[#DFE2E81A] shadow-sm relative overflow-hidden">
          <div className="flex flex-1 overflow-x-auto scrollbar-hide pr-2 relative">
            {days.map((day, index) => (
              <div key={day} className="flex items-center cursor-pointer">
                <div className="flex flex-col items-center justify-between min-w-[50px] h-[72px] bg-[#E9EBEE75] rounded-md py-2 relative">
                  <div className="flex items-center justify-center flex-1">
                    {moodData[day] ? (
                      <span className="text-[22px]">{moodData[day]}</span>
                    ) : (
                      <div className="w-[22px] h-[22px] rounded-full border-[1px] border-dashed border-gray-300" />
                    )}
                  </div>
                  <span className="text-[12px] mb-[4px] text-[#4E5660CC]">{day}</span>
                </div>

                {index < days.length - 1 && (
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
