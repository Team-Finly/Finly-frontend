import PatternBg from '../../assets/images/stats_pattern.svg';

const RelationPattern = () => {
  return (
    <div
      className="flex w-full flex-col gap-4 rounded-[20px] px-5 py-5 shadow-sm"
      style={{
        backgroundImage: `url(${PatternBg})`,
        backgroundSize: '105%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="w-fit rounded-[20px] bg-gray-100 px-2 py-1 text-[13px] font-medium text-gray-500">
        투자 패턴 발견
      </div>
      <div className="text-[13px] leading-relaxed font-medium whitespace-pre-wrap text-gray-700">
        {`기현님의 오전 10시 전 '불안'은 85% 확률로 손절로 이어졌어요\n하지만 그중 60%는 오후에 가격이 다시 회복되었어요`}
      </div>
    </div>
  );
};

export default RelationPattern;
