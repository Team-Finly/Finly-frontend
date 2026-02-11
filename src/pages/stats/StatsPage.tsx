import { useState, useEffect, useMemo } from 'react';
import { useRecordedStocks, useStatsEntry } from '@/hooks/useStatsEntry';
import type { StockInfo } from '@/types/stock';
import { STATS_TABS, type TabType } from '@/types/stats';
import Header from '@/components/stats/Header';
import StockSelector from '@/components/stats/StockSelector';
import Tabbar from '@/components/stats/Tabbar';
import RelationTab from '@/pages/stats/RelationTab';
import StockTab from '@/pages/stats/StockTab';
import EmotionTab from '@/pages/stats/EmotionTab';
import EmptyTab from '@/pages/stats/EmptyTab';
import NoStock from '@/components/stats/NoStock';
import ErrorPage from '@/pages/home/ErrorPage';
import { useStatsStore } from '@/store/statsStockStore';
import { stockInfoStore } from '@/store/stockInfoStore';

const StatsPage = () => {
  const {
    data: statsInfo,
    isLoading: isEntryLoading,
    isError: isEntryError,
  } = useStatsEntry();
  const {
    data: recordedList,
    isLoading: isRecordedLoading,
    isError: isRecordedError,
  } = useRecordedStocks();
  const { currentStock, setCurrentStock } = useStatsStore();
  const [currentTab, setCurrentTab] = useState<TabType>(STATS_TABS[0].id);
  const { stockMap, isLoaded: isMapLoaded } = stockInfoStore();

  const fullRecordedStocks = useMemo(() => {
    if (!recordedList || !isMapLoaded) return [];

    return recordedList.map((item) => {
      const info = stockMap[item.symbol];
      return (
        info ||
        ({
          symbol: item.symbol,
          name: item.stockName,
          logoUrl: '',
          isActive: true,
          isin: '',
          marketType: 'KOSPI',
        } as StockInfo)
      );
    });
  }, [recordedList, stockMap, isMapLoaded]);

  useEffect(() => {
    if (currentStock || !statsInfo?.defaultStock || !isMapLoaded) return;

    const { symbol } = statsInfo.defaultStock;
    const fullStockInfo = stockMap[symbol];

    setCurrentStock(
      fullStockInfo ||
        ({
          ...statsInfo.defaultStock,
          logoUrl: '',
          isActive: true,
          isin: '',
          marketType: 'KOSPI',
        } as StockInfo),
    );
  }, [statsInfo, isMapLoaded, currentStock, stockMap, setCurrentStock]);

  const isInitialLoading = isEntryLoading || isRecordedLoading || !isMapLoaded;
  const isInitialError = isEntryError || isRecordedError;

  if (isInitialLoading)
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="border-t-secondary h-10 w-10 animate-spin rounded-full border-4 border-gray-200" />
          <p className="text-sm font-medium text-gray-500">
            통계 데이터를 불러오고 있어요...
          </p>
        </div>
      </div>
    );
  if (isInitialError || !statsInfo) return <ErrorPage />;

  const { recordLevel, totalRecordCount } = statsInfo;

  const renderContent = () => {
    if (recordLevel === 'NONE') {
      return <EmptyTab status="EMPTY" />;
    }
    if (recordLevel === 'LOW') {
      return <EmptyTab status="LOADING" recordCount={totalRecordCount} />;
    }
    if (recordLevel === 'HIGH') {
      if (currentTab === 'RELATION') return <RelationTab />;
      if (currentTab === 'STOCK') return <StockTab />;
      if (currentTab === 'EMOTION') return <EmotionTab />;
    }

    return null;
  };

  return (
    <div className="flex w-full flex-1 flex-col bg-gray-50 pb-25">
      <style>{`
        .recharts-wrapper,
        .recharts-wrapper *,
        .recharts-surface,
        .recharts-layer {
          outline: none !important;
          box-shadow: none !important;
          -webkit-tap-highlight-color: transparent !important;
          -webkit-touch-callout: none !important;
          -webkit-user-select: none !important;
          user-select: none !important;
        }
        *:focus {
          outline: none !important;
        }
      `}</style>
      <div className="sticky top-0 z-50 flex flex-none flex-col gap-6 bg-white pt-4">
        <Header />
        {recordLevel === 'HIGH' && currentStock ? (
          <StockSelector
            stocks={fullRecordedStocks}
            selectedStock={currentStock}
            onSelect={setCurrentStock}
          />
        ) : (
          <NoStock />
        )}
        <Tabbar currentTab={currentTab} onTabChange={setCurrentTab} />
      </div>
      <div className="flex flex-1 flex-col">{renderContent()}</div>
    </div>
  );
};

export default StatsPage;
