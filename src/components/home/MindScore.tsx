export const MindScore = () => {
  return (
    <div>
      <section className="px-[12px] py-[27px] bg-white rounded-xl shadow-[#DFE2E81A] shadow-sm flex justify-between items-center">
        <div>
          <p className="text-[12px] text-[#4E5660CC]">신중한 거북이</p>
          <h2 className="text-[20px] font-semibold mb-[20px]">
            <span className="text-[#278DFD] font-bold">키르</span>님의 금융 마음 지수
          </h2>
          <span className="bg-[#EEEFF0] px-[10px] py-[4px] rounded-full text-[14px] text-[#6E757D] font-semibold">평균적 대응</span>
          <p className="text-[13px] text-[#4E5660] mt-[10px]">
            : 일부 상황에서는 <span className="font-bold">이성적</span>으로 대응하고 있어요
          </p>
        </div>
        
        {/* 원형 프로그레스 바 */}
        <div className="relative w-[94px] h-[94px] flex items-center justify-center">
          <svg className="w-full h-full transform rotate-90">
            <circle cx="48" cy="48" r="40" stroke="#EEEFF0" strokeWidth="11" fill="transparent" />
            <circle cx="48" cy="48" r="40" stroke="#FFF34A" strokeWidth="11" fill="transparent"
              strokeDasharray="251" strokeDashoffset={251 * (1 - 60 / 100)} strokeLinecap="round" />
          </svg>
          <span className="absolute text-[#1F2023] text-[26px] font-semibold">64<span className="text-[#6E757D] text-[14px]">점</span></span>
        </div>
      </section>

      <div className="flex justify-end mt-[12px]">
        <button
          type="button"
          onClick={() => { }}
          className="text-[12px] text-[#6E757D] underline underline-offset-2 transition-colors"
        >
          금융 마음 지수란?
        </button>
      </div>
    </div>
  )
};
