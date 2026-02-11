import { twMerge } from 'tailwind-merge';

export const UniversalSkeleton = ({ className }: { className?: string }) => (
  <div
    className={twMerge(
      'relative h-full w-full overflow-hidden rounded-xl bg-gray-100',
      className,
    )}
  >
    <div
      className="animate-shimmer absolute inset-0 h-full w-full"
      style={{
        background:
          'linear-gradient(110deg, transparent 30%, rgba(255, 255, 255, 0.5) 50%, transparent 70%)',
      }}
    />
  </div>
);
