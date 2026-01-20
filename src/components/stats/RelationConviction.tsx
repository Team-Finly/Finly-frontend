const RelationConviction = () => {
  return (
    <div className="rounded-[12px] border-[1.2px] border-gray-100 bg-white p-4">
      <div className="mb-3 text-[14px] font-semibold text-gray-500">
        매수 확신도
      </div>
      <div className="mb-1 flex flex-row items-baseline">
        <div className="text-stock-sell mr-1 text-[26px] font-semibold">42</div>
        <div className="text-[12px] font-medium text-gray-300">Low</div>
      </div>
      <div className="text-[11px] font-medium text-gray-300">
        충동적 결정 주의
      </div>
    </div>
  );
};

export default RelationConviction;
