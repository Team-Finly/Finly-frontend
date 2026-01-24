const AnalysisCard = () => {
  return (
    <div className="flex w-full flex-col px-4 pt-7">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-2">
          <div className="text-[18px] font-semibold text-gray-900">
            불안 조각
          </div>
          <div className="text-emotion-anxiety bg-emotion-bg-anxiety flex items-center justify-center rounded-sm px-1 py-0.5 text-[11px]">
            Lv. 7
          </div>
        </div>
        <div className="text-[18px] font-semibold text-gray-900">72,400원</div>
      </div>
      <div className="mt-1 mb-2 flex flex-row justify-end text-[12px] font-semibold text-gray-300">
        2주 매도 · 1주 당 72,400원
      </div>
      <div className="mb-2 text-[12px] font-semibold text-gray-300">
        오전 11시 12분 기록
      </div>
      <div className="rounded-[12px] border-[1.2px] border-gray-100 bg-gray-50/60 p-3.5 text-[14px] leading-[1.6] text-gray-700">
        “주가가 갑자기 2%나 밀리니까 손이 떨림. 지금이라도 팔아야하나 고민했지만
        핀리에 기록하며 마음을 가다듬음.”
      </div>
    </div>
  );
};

export default AnalysisCard;
