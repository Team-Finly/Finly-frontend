import NoStockIcon from '@/assets/icons/stats_no_stock.svg';

const NoStock = () => {
  return (
    <div className="relative w-full px-8">
      <div className="flex items-center justify-start">
        <div className="flex items-center gap-2">
          <img
            className="h-[24px] w-[24px] rounded-full object-cover"
            src={NoStockIcon}
            alt="종목없음"
          />
          <div className="text-[17px] font-semibold text-gray-500">
            종목없음
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoStock;
