interface AIFeedBackProps {
  type: 'monthly' | 'weekly';
  week?: string;
}

const AIFeedBack = ({ type, week }: AIFeedBackProps) => {
  const isWeekly = type === 'weekly';

  const WEEKLY_FEEDBACKS: Record<string, any> = {
    "1": {
      main: "이번 주에는 불안과 후회 감정이 함께 기록된 경우가 많았어요. 특히 판단 이후 감정을 돌아보는 기록이 반복되며, 선택의 결과보다 과정에 대한 고민이 드러난 한 주였어요.",
      title: "불안이 기록되는 순간, 판단을 ",
      highlight: "한 번 더 점검",
      suffix: "해보세요",
    },
    "2": {
      main: "이번 주에는 확신과 평온 감정이 가장 많이 기록되었어요. 판단 전후 감정의 변화가 크지 않았고, 스스로의 기준을 신뢰하며 차분하게 선택을 이어갔어요.",
      title: "확신이 들수록 ",
      highlight: "이유와 기준",
      suffix: "을 꼭 기록으로 남기세요.",
    }
  };

  const currentWeekly = isWeekly ? WEEKLY_FEEDBACKS[week || "1"] : null;

  const feedback = isWeekly ? {
    main: currentWeekly.main,
    tag: "추천",
    title: currentWeekly.title,
    highlight: currentWeekly.highlight,
    suffix: currentWeekly.suffix,
    themeColor: "text-purple-400",
    bgColor: "bg-purple-500/30",
    tagBg: "bg-purple-900/40"
  } : {
    main: "월 초 하락 국면에서는 불안 감정이 두드러졌지만, 이후에는 감정적 개입을 줄이고 시장을 관찰하며 점차 안정적인 판단 흐름을 유지한 기간이었어요.",
    tag: "추천",
    title: "불안이 기록되는 순간, 판단을 ",
    highlight: "한 번 더 점검",
    suffix: "해보세요",
    themeColor: "text-[#278DFDCC]",
    bgColor: "bg-[#3E9AFF4D]",
    tagBg: "bg-[#0A1D32]"
  };

  return (
    <section className="mt-[50px]">
      <h3 className="mb-[20px] text-[17px] font-semibold">AI 피드백</h3>
      <div
        className="relative overflow-hidden rounded-xl border-[1.2px] border-[#4E5660]"
      >
        <div className="absolute inset-0 bg-[#0C2138CC]" />
        <div className="absolute inset-0 bg-white/10" />

        <div className="relative px-[16px] py-[20px] text-[14px] leading-relaxed">
          <p>{feedback.main}</p>

          <div className="mt-[20px]">
            <span className="inline-block rounded bg-[#0A1D32] px-[8px] py-[2px] text-[13px] font-semibold text-[#278DFDCC]">
              {feedback.tag}
            </span>

            <p className="mt-[6px] text-[14px] font-semibold leading-relaxed">
              {feedback.title}
              <span className="bg-[#3E9AFF4D] px-1 py-[2px]">
                {feedback.highlight}
              </span>
              {feedback.suffix}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AIFeedBack;
