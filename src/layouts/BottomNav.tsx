import { NavLink } from 'react-router-dom';
import HomeIcon1 from '@/assets/icons/Group-2.svg';
import HomeIcon2 from '@/assets/icons/Group.svg';
import RecordIcon1 from '@/assets/icons/Vector-3.svg';
import RecordIcon2 from '@/assets/icons/Vector-5.svg';
import StatsIcon1 from '@/assets/icons/Vector-4.svg';
import StatsIcon2 from '@/assets/icons/Vector-6.svg';
import ProfileIcon1 from '@/assets/icons/Group-3.svg';
import ProfileIcon2 from '@/assets/icons/Group-4.svg';

const tabs = [
  { 
    id: 'home', 
    label: '홈', 
    defaultIcon: HomeIcon1, 
    activeIcon: HomeIcon2, 
    path: '/' 
  },
  { 
    id: 'record', 
    label: '기록', 
    defaultIcon: RecordIcon1, 
    activeIcon: RecordIcon2, 
    path: '/record' 
  },
  { 
    id: 'stats', 
    label: '통계', 
    defaultIcon: StatsIcon1, 
    activeIcon: StatsIcon2, 
    path: '/stats' 
  },
  { 
    id: 'profile', 
    label: '마이', 
    defaultIcon: ProfileIcon1, 
    activeIcon: ProfileIcon2, 
    path: '/profile' 
  },
];

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
      <div className="flex justify-around items-center w-full max-w-[480px] bg-white">
        {tabs.map((tab) => (
          <NavLink
            key={tab.id}
            to={tab.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 transition-colors ${
                isActive ? 'text-[#278DFD]' : 'text-[#C5C8CE]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={isActive ? tab.activeIcon : tab.defaultIcon}
                  alt={tab.label}
                  className="w-[17.05px] h-[18px] mt-[16px]"
                />
                <span className="text-[13px] mt-[8px] mb-[38px] font-semibold">{tab.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
      {/* 모바일 하단바 여백 대응 */}
      <div className="h-[env(safe-area-inset-bottom)] bg-white" />
    </nav>
  );
};
