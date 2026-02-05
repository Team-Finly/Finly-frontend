import exclamationIcon from '@/assets/icons/exclamation.svg';
import { useMarketInsight } from '@/hooks/useMarketInsight';

export const RealtimeInsight = () => {
  const { data, isLoading, isError } = useMarketInsight();

  if (isLoading) return null;
  if (isError || !data) return null; 
  
  return (
    <div>
      <section className="mt-6 mb-[120px]">
        <h3 className="font-semibold text-[17px] mb-3">실시간 인사이트</h3>
        <div className="bg-white px-[15px] py-[11px] rounded-full flex items-center shadow-[#DFE2E81A] shadow-sm">
          <img src={exclamationIcon} className="w-[16px] h-[16px]" alt="실시간 인사이트 아이콘" />
          <p className="ms-[9px] text-[13px] text-gray-700">{data.message}</p>
        </div>
      </section>
    </div>
  )
}
