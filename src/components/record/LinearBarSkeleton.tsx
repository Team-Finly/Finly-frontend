import { UniversalSkeleton } from '@/components/UniversalSkeleton';

export const LinearBarSkeleton = () => (
  <div className="w-full">
    <UniversalSkeleton className="h-6 w-full rounded-full" />
    <div className="mt-2 mb-5.5 flex justify-between">
      <UniversalSkeleton className="h-4 w-32 rounded-md" />
      <UniversalSkeleton className="h-4 w-24 rounded-md" />
    </div>
  </div>
);
