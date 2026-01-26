type MetricCardProps = {
  title: string;
  score: number;
  desc: string;
};

const MetricCard = ({ title, score, desc }: MetricCardProps) => {
  return (
    <div className="bg-white rounded-xl p-[16px]">
      <div className="flex justify-between items-center mb-[8px]">
        <h3 className="font-semibold text-gray-900">
          {title}
        </h3>
        <span className="font-semibold text-gray-900">
          {score}/100
        </span>
      </div>

      {/* progress bar */}
      <div className="w-full h-[8px] bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#278DFD] rounded-full transition-all duration-500"
          style={{ width: `${score}%` }}
        />
      </div>

      <p className="mt-[10px] text-[13px] text-gray-600 leading-relaxed">
        {desc}
      </p>
    </div>
  );
};

export default MetricCard;
