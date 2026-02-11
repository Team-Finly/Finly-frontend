import React from 'react';

const FragmentDetailSkeleton = () => {
  return (
    <div className="shadow-card2 animate-pulse rounded-xl border-[1.2px] border-gray-100 px-3.75 py-4.25">
      <div className="mb-5.25 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-1.5 h-5 w-24 rounded bg-gray-100" />
          <div className="h-5 w-14 rounded-full bg-gray-100" />
        </div>
        <div className="h-3 w-16 rounded bg-gray-100" />
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-gray-100" />
        <div className="h-3 w-3/4 rounded bg-gray-100" />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="h-4 w-8 rounded bg-gray-100" />
          <div className="h-4 w-2 rounded bg-gray-50" />
          <div className="h-4 w-20 rounded bg-gray-100" />
        </div>
        <div className="h-4 w-10 rounded bg-gray-100" />
      </div>
    </div>
  );
};

export default FragmentDetailSkeleton;
