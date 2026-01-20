export const RecentRecordCard = ({ company, price, status, type, logo, color }: any) => {
  return (
    <div className="min-w-[220px] bg-white p-[16px] rounded-xl shadow-[#DFE2E81A] shadow-sm border border-[#F2F4F6]">
      {/* 날짜 */}
      <p className="text-[12px] text-[#4E566066] mb-4">12.25</p>
  
      <div className="flex items-center mb-6">
        {/* 1. 로고와 회사명 */}
        <div className="flex items-center gap-2">
          <span className="text-lg">{logo}</span>
          <span className="text-[15px] font-bold text-[#191F28]">{company}</span>
        </div>

        {/* 2. 가격 영역 (2주를 absolute로 띄움) */}
        <div className="ml-auto relative flex items-center">
          {/* '2주' - absolute로 띄워서 전체 flex 높이에 영향을 주지 않음 */}
          <span className="absolute -top-[16px] right-0 text-[11px] text-[#8B95A1] whitespace-nowrap">
            2주
          </span>
          {/* 가격 - 로고/회사와 같은 선상에 위치 */}
          <p className="text-[18px] font-bold text-[#191F28] leading-none">
            {price}
          </p>
        </div>
      </div>

      {/* 하단 태그 */}
      <div className="flex justify-between items-center">
        <span className={`text-xs px-2 py-1 rounded-lg font-bold ${color === 'red' ? 'bg-red-50 text-red-400' : 'bg-blue-50 text-blue-400'}`}>{status}</span>
        <span className="text-[11px] text-[#8B95A1] bg-[#F2F4F6] px-1.5 py-0.5 rounded font-medium">{type}</span>
      </div>
    </div>
  )
};
