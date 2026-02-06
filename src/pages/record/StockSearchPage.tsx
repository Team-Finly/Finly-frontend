import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Before from '@/assets/icons/before.svg';
import Delete from '@/assets/icons/delete.svg';
import Message from '@/assets/icons/message.svg';
import StockItem from '@/components/record/StockItem';
import { useStockSearch } from '@/hooks/useStockSearch';
import { useDebounce } from '@/hooks/useDebounce';
import { useInView } from 'react-intersection-observer';
import { useRecordCreateStore } from '@/store/recordCreateStore';

const StockSearchPage = () => {
  const navigate = useNavigate();
  const setStock = useRecordCreateStore((state) => state.setStock);
  const [keyword, setKeyword] = useState<string>('');
  const debouncedKeyword = useDebounce(keyword, 300);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useStockSearch(debouncedKeyword);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const stocks = data?.pages.flatMap((page) => page.stocks) || [];

  return (
    <div>
      <div className="fixed top-0 flex h-19 w-full max-w-120 items-center gap-5.5 bg-white px-4 pt-4">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <img src={Before} alt="이전" className="h-4 w-2" />
        </button>
        <div className="flex h-12.5 flex-1 gap-3.75 rounded-xl border-[1.2px] border-gray-100 bg-gray-50/60 px-3.75 focus:text-gray-900">
          <input
            type="text"
            placeholder="종목명 검색"
            className="flex-1 font-normal placeholder:text-gray-500/40 focus:outline-none"
            spellCheck={false}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          {keyword !== '' && (
            <button
              onClick={() => setKeyword('')}
              onMouseDown={(e) => e.preventDefault()}
              className="cursor-pointer"
            >
              <img src={Delete} alt="입력어 삭제" />
            </button>
          )}
        </div>
      </div>
      {debouncedKeyword &&
        !isLoading &&
        (stocks.length > 0 ? (
          <>
            <div className="mt-22 mb-5 flex flex-col gap-5 px-4">
              {stocks.map((stock) => (
                <StockItem
                  key={stock.id}
                  stock={stock}
                  keyword={keyword}
                  onClick={(selectedStock) => {
                    setStock(
                      selectedStock.id,
                      selectedStock.name,
                      selectedStock.symbol,
                    );
                    navigate('/record/create', { replace: true });
                  }}
                />
              ))}
            </div>
            <div ref={ref}></div>
          </>
        ) : (
          <div className="mt-[217px] flex h-[65px] w-full flex-col items-center justify-between rounded-xl">
            <img src={Message} alt="메시지 아이콘" className="w-[30px]" />
            <p className="text-gray-300">검색 결과가 없어요</p>
          </div>
        ))}
    </div>
  );
};

export default StockSearchPage;
