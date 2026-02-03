import { useState } from 'react';
import Header from '@/components/stats/Header';
import StockSelector from '@/components/stats/StockSelector';
import Tabbar from '@/components/stats/Tabbar';
import StockImg from '@/assets/images/stats_stockExam.svg';
import type { Stock } from '@/types/stats';
import { STATS_TABS, type TabType } from '@/types/stats';
import RelationTab from './RelationTab';
import StockTab from './StockTab';
import EmotionTab from './EmotionTab';
import EmptyTab from './EmptyTab';
import NoStock from '@/components/stats/NoStock';

// 임시 더미 데이터 (API 연결 시 삭제 예정)
const MOCK_STOCKS = [
  { id: 1, name: '삼성전자', logoUrl: StockImg },
  { id: 2, name: 'SK하이닉스', logoUrl: StockImg },
  { id: 3, name: '카카오', logoUrl: StockImg },
];

type ViewStatus = 'LOADING' | 'EMPTY' | 'ACTIVE';
const CURRENT_TEST_STATUS = 'ACTIVE' as ViewStatus;

const StatsPage = () => {
  const [currentStock, setCurrentStock] = useState<Stock>(MOCK_STOCKS[0]);
  const [currentTab, setCurrentTab] = useState<TabType>(STATS_TABS[0].id);

  const renderContent = () => {
    switch (CURRENT_TEST_STATUS) {
      case 'LOADING':
        return <EmptyTab status="LOADING" />;
      case 'EMPTY':
        return <EmptyTab status="EMPTY" />;
      case 'ACTIVE':
        if (currentTab === 'RELATION') return <RelationTab />;
        if (currentTab === 'STOCK') return <StockTab />;
        if (currentTab === 'EMOTION') return <EmotionTab />;
        return null;
      default:
        return null;
    }
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
        {CURRENT_TEST_STATUS === 'ACTIVE' ? (
          <StockSelector
            stocks={MOCK_STOCKS}
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
