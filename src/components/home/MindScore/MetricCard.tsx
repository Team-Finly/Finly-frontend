type MetricCardProps = {
  title: string;
  score: number;
  desc: string;
};

const MetricCard = ({ title, score, desc }: MetricCardProps) => {
  return (
    <div className="mb-[20px]">
      <div className="flex justify-between items-center mb-[20px]">
        <h3 className="text-[17px] font-semibold text-gray-700">
          {title}
        </h3>
        <span>
          <span className="text-[17px] font-bold text-[#1F2023]">
            {score}
          </span>
          <span className="text-[15px] font-semibold text-[#6E757DCC]">
            /100 
          </span>
        </span>
      </div>

      {/* progress bar */}
      <div className="w-full h-[10px] bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#278DFD] rounded-full transition-all duration-500"
          style={{ width: `${score}%` }}
        />
      </div>

      <p className="bg-[#F4F5F799] border border-gray-100 rounded-xl mt-[12px] px-[16px] py-[12px] text-[13px] text-gray-600 leading-relaxed">
        {desc}
      </p>
    </div>
  );
};

export default MetricCard;
