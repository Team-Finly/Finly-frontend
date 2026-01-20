import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: LayoutProps) => {
  return (
    <div className="relative mx-auto flex h-dvh w-full max-w-[480px] flex-col shadow-lg">
      {/* <Header /> */}
      <main className="scrollbar-hide flex flex-1 flex-col overflow-y-auto pb-20">
        {children}
      </main>
      {/* <BottomNav /> */}
    </div>
  );
};

export default AppLayout;
