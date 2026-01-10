import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full max-w-[480px] mx-auto min-h-dvh flex flex-col relative shadow-lg">
      {/* <Header /> */}
      <main className="flex-1 overflow-y-auto px-4 pb-20">
        {children}
      </main>
      {/* <BottomNav /> */}
    </div>
  );
};

export default AppLayout;