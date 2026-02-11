import type { ReactNode } from 'react';
import { UniversalSkeleton } from '@/components/UniversalSkeleton';

export const apiRenderGuard = (
  isLoading: boolean,
  isError: boolean,
  data: any,
  customSkeleton?: ReactNode,
) => {
  if (isLoading) {
    return customSkeleton || <UniversalSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="p-10 text-center text-gray-400">
        데이터를 가져오는 데 실패했습니다.
      </div>
    );
  }

  return undefined;
};
