type Props = {
  score: number;
  color: string;
  size?: number;
};

const CircularScore = ({ score, color, size = 94 }: Props) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div
      className="relative flex-shrink-0 flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg className="w-full h-full transform -rotate-270">
        <circle cx="48" cy="48" r={radius} stroke="#EEEFF0" strokeWidth="11" fill="transparent" />
        <circle
          cx="48"
          cy="48"
          r={radius}
          stroke={color}
          strokeWidth="11"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>

      <span className="absolute text-gray-900 text-[26px] font-semibold">
        {score}
        <span className="text-gray-500 text-[14px]">점</span>
      </span>
    </div>
  );
};

export default CircularScore;
