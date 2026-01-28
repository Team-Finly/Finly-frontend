interface ProgressBarProps {
  current: number; 
  total: number;   
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
const steps = Array.from({ length: total });

return (
    // 전체 진행 바 컨테이너
    <div className="flex justify-center mx-auto gap-[2px] w-[94px] mt-[20px] ">
      {steps.map((_, index) => {
        let roundedClass = 'rounded-none'; // 기본: 직사각형
        if (index === 0) {
          roundedClass = 'rounded-l-[4px]'; // 첫 번째 조각
        } else if (index === total - 1) {
          roundedClass = 'rounded-r-[4px]'; // 마지막 조각
        }

        //색상 결정
        const colorClass = index < current ? 'bg-secondary' : 'bg-gray-100';

        return (
          <div
            key={index}
            className={`h-2 flex-1 transition-colors duration-300 ${roundedClass} ${colorClass}`}
          />
        );
      })}
    </div>
  );
};

export default ProgressBar;
