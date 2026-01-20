import { Outlet, useMatches } from 'react-router-dom';
import { BottomNav } from './BottomNav';

const AppLayout = () => {
  const matches = useMatches();

  const showNav = matches.some((match) => 
    (match.handle as any)?.showNav === true
  );

  return (
    <div className="relative mx-auto flex h-dvh w-full max-w-[480px] flex-col shadow-lg">
      <main className="scrollbar-hide flex flex-1 flex-col overflow-y-auto">
        <Outlet />
      </main>
      {showNav && <BottomNav />}
    </div>
  );
};

export default AppLayout;
