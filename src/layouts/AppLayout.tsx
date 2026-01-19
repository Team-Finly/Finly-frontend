import React from 'react';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-[480px] flex-col shadow-lg">
      {/* <Header /> */}
      <main className="flex-1 overflow-y-auto px-4 pb-20">
        <Outlet />
      </main>
      {/* <BottomNav /> */}
    </div>
  );
};

export default AppLayout;
