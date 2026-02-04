import TelescopeIcon from '@/assets/images/Telescope.svg';
import Bell from '@/assets/icons/bell.svg';
import { useNavigate } from 'react-router-dom';
import type { MarketIndex } from '@/types/market';
import { useEffect, useState } from 'react';
import { marketApi } from '@/apis/marketApi';

const Header = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<MarketIndex | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        const res = await marketApi.getMarketIndex();
        setData(res);
      } catch (e) {
        console.error("market index fetch failed", e);
        setError(true);
      }
    };

    fetchMarket();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white flex w-full items-center bg-white justify-between pb-[9px] h-[76px] pt-[25px] px-[16px]">
      <div className="flex gap-2 bg-blue-bg items-center px-[16px] py-[9px] rounded-full text-[13px] text-gray-700">
        <img src={TelescopeIcon} alt="망원경 아이콘" className="w-5 h-5" />
        {error || !data ? (
          <span>코스피 / 코스닥 지수 로딩 실패</span>
        ) : (
          <>
            <span>코스피 {data.kospi}</span>
            <span>코스닥 {data.kosdaq}</span>
          </>
        )}
      </div>
      <button
        className="relative px-[4px] cursor-pointer"
        onClick={() => navigate('/notification')}
      >
        <img src={Bell} alt="알림 아이콘" className="w-6 h-6" />
        <span className="absolute top-[-6px] right-[2px] w-2.5 h-2.5 bg-red rounded-full border-2 border-white"></span>
      </button>
    </header>
  );
};

export default Header;
