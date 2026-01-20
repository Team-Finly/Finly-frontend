interface Props {
  label: string;
  percentage: number;
  colorClass?: string;
}

const SimpleProgressBar = ({
  label,
  percentage,
  colorClass = 'bg-gray-300',
}: Props) => {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-[13px]">
        <span className="text-[11px] font-medium text-gray-400">{label}</span>
        <span className="text-[11px] font-semibold text-gray-400">
          {clampedPercentage}%
        </span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-50">
        <div
          className={`h-full ${colorClass} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clampedPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SimpleProgressBar;
