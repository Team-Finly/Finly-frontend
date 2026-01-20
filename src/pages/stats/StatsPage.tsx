import { useState } from 'react';
import Header from '../../components/stats/Header';
import StockSelector from '../../components/stats/StockSelector';
import Tabbar from '../../components/stats/Tabbar';
import StockImg from '../../assets/images/stats_stockExam.svg';
import type { Stock } from '../../types/stats';
import { STATS_TABS, type TabType } from '../../types/stats';
import RelationTab from './RelationTab';
import StockTab from './StockTab';
import EmotionTab from './EmotionTab';

// 임시 더미 데이터 (API 연결 시 삭제 예정)
const MOCK_STOCKS = [
  { id: 1, name: '삼성전자', logoUrl: StockImg },
  { id: 2, name: 'SK하이닉스', logoUrl: StockImg },
  { id: 3, name: '카카오', logoUrl: StockImg },
];

const StatsPage = () => {
  const [currentStock, setCurrentStock] = useState<Stock>(MOCK_STOCKS[0]);
  const [currentTab, setCurrentTab] = useState<TabType>(STATS_TABS[0].id);

  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="sticky top-0 z-50 flex flex-none flex-col gap-6 bg-white pt-4">
        <Header />
        <StockSelector
          stocks={MOCK_STOCKS}
          selectedStock={currentStock}
          onSelect={setCurrentStock}
        />
        <Tabbar currentTab={currentTab} onTabChange={setCurrentTab} />
      </div>
      <div className="flex flex-1 flex-col">
        {currentTab === 'RELATION' && <RelationTab />}
        {currentTab === 'STOCK' && <StockTab />}
        {currentTab === 'EMOTION' && <EmotionTab />}
      </div>
    </div>
  );
};

export default StatsPage;
