interface BestDecisionCardProps {
  emoji: string;
  emojiBgColor: string;
  title: string;        
  action: string;       
  date: string;         
  holdingWeeks: number;
  price: string;        
  rate: string;         
}

const BestDecisionCard = ({
  emoji,
  emojiBgColor,
  title,
  action,
  date,
  holdingWeeks,
  price,
  rate,
}: BestDecisionCardProps) => {
  return (
    <div className="relative overflow-hidden rounded-xl border-[1.2px] border-[#4E5660]">
      <div className="absolute inset-0 bg-[#0C2138CC]" />
      <div className="absolute inset-0 bg-white/10" />

      <div className="relative flex items-center justify-between px-[13px] py-[18px]">
        <div className="flex items-center gap-[12px]">
          <div
            className="flex h-[50px] w-[50px] items-center justify-center rounded-[10px] text-[22px]"
            style={{ backgroundColor: emojiBgColor }}
          >
            {emoji}
          </div>

          <div>
            <div className="flex items-center gap-[8px]">
              <p className="text-[15px] font-semibold">{title}</p>
              <span className="rounded-full bg-[#EEEFF0] px-[7px] py-[2px] text-[12px] text-[#4E5660CC]">
                {action}
              </span>
            </div>
            <p className="mt-[12px] text-[12px] text-[#C5C8CE]">
              {date} · {holdingWeeks}주
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-[18px] font-semibold mb-[6px]">{price}</p>
          <p className="text-[16px] text-[#FF4548]">
            {rate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BestDecisionCard;