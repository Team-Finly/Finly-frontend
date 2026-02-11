import { UniversalSkeleton } from '@/components/UniversalSkeleton';

const CalendarSkeleton = () => (
  <div className="overflow-hidden rounded-xl bg-white p-5">
    <div className="mb-4 flex items-center justify-between px-1">
      <UniversalSkeleton className="h-6 w-24 rounded-md" />
      <div className="flex gap-3">
        <UniversalSkeleton className="h-6 w-6 rounded-full" />
        <UniversalSkeleton className="h-6 w-10 rounded-md" />
        <UniversalSkeleton className="h-6 w-6 rounded-full" />
      </div>
    </div>
    <div className="mb-2">
      <UniversalSkeleton className="h-[30px] w-full rounded-lg opacity-60" />
    </div>
    <UniversalSkeleton className="h-[200px] w-full rounded-lg opacity-60" />
  </div>
);

export default CalendarSkeleton;
