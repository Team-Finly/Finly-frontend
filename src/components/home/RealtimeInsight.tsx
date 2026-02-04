import { marketApi } from '@/apis/marketApi';
import exclamationIcon from '@/assets/icons/exclamation.svg';
import type { MarketInsight } from '@/types/market';
import { useEffect, useState } from 'react';

export const RealtimeInsight = () => {
  const [insight, setInsight] = useState<MarketInsight | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await marketApi.getMarketInsight();
        setInsight(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetch();
  }, []);
  
  return (
    <div>
      <section className="mt-6 mb-[120px]">
        <h3 className="font-bold text-lg mb-3">실시간 인사이트</h3>
        <div className="bg-white px-[15px] py-[11px] rounded-full flex items-center shadow-[#DFE2E81A] shadow-sm">
          <img src={exclamationIcon} className="w-[16px] h-[16px]" alt="실시간 인사이트 아이콘" />
          <p className="ms-[9px] text-[13px] text-gray-700">{insight?.message}</p>
        </div>
      </section>
    </div>
  )
}
