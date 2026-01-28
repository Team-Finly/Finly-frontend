import { STATS_TABS, type TabType } from '@/types/stats';

interface Props {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const Tabbar = ({ currentTab, onTabChange }: Props) => {
  return (
    <div className="flex h-12 w-full justify-between px-8">
      {STATS_TABS.map((tab) => {
        const isActive = currentTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-[90px] text-center text-[14px] transition-all ${
              isActive
                ? 'border-secondary text-secondary border-b-[2px] font-semibold'
                : 'font-medium text-gray-500'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default Tabbar;
