import { Outlet, useMatches, useNavigate } from 'react-router-dom';
import { BottomNav } from '@/layouts/BottomNav';
import ReportModal from '@/components/home/Report/ReportModal';
import { useState } from 'react';

const AppLayout = () => {
  const matches = useMatches();
  const [open, setOpen] = useState(false); // ReportModal 임의로 꺼둠
  const navigate = useNavigate();

  const showNav = matches.some(
    (match) => (match.handle as any)?.showNav === true,
  );

  return (
    <div className="relative mx-auto flex h-dvh w-full max-w-[480px] flex-col shadow-lg">
      <main className="scrollbar-hide flex flex-1 flex-col overflow-y-auto">
        <Outlet />
      </main>
      {showNav && <BottomNav />}

      <ReportModal
        isOpen={open}
        name="키르"
        month="2월"
        onClose={() => setOpen(false)}
        onConfirm={() => {
          setOpen(false);
          navigate('/reports/2025-02');
        }}
      />
    </div>
  );
};

export default AppLayout;
