interface AIFeedBackProps {
  type: 'monthly' | 'weekly';
  week?: string;
  yearMonth?: string;
}

const AIFeedBack = ({ type, week, yearMonth }: AIFeedBackProps) => {
  const isWeekly = type === 'weekly';

  const FEEDBACK_REPORTS: any = {
    "2026-01": {
      weekly: {
        "1": {
          main: "이번 주는 주가 변동 폭이 커지면서 '불안' 감정이 지배적인 한 주였어요. 매도 후에도 \"더 떨어지면 어떡하지?\" 또는 \"반등하면 어쩌지?\" 하는 걱정에 기록이 늘어났네요.",
          title: "불안이 기록되는 순간, 판단을 ",
          highlight: "한 번 더 점검",
          suffix: "해보세요",
        },
        "2": {
          main: "\"지금 사야 해!\"라는 마음이 강했던 한 주네요. '탐욕' 조각이 급격히 늘어난 걸 보니, 상승하는 차트를 보며 평소보다 빠르게 매수 버튼을 누른 순간들이 많았어요.",
          title: "매수 전, '", highlight: "추격 매수", suffix: "하는 건 아닐까?' 질문해 보세요",
        },
        "3": {
          main: "기록된 조각의 개수가 줄어들고, '평온'의 비중이 높아졌어요. 무리한 진입보다는 현금을 보유하거나 기존 종목을 차분히 지켜보는 관망세를 유지했군요. 아주 잘했어요!",
          title: " 아무것도 하지 않는 것도 ", highlight: "훌륭한 투자 전략", suffix: "이에요",
        },
        "4": {
          main: "이번 주에는 확신과 평온 감정이 가장 많이 기록되었어요.판단 전후 감정의 변화가 크지 않았고, 스스로의 기준을 신뢰하며 차분하게 선택을 이어갔어요",
          title: "확신이 들수록 ", highlight: "이유와 기준", suffix: "을 꼭 기록으로 남기세요",
        }
      },
      monthly: {
        main: "이번 달은 확신이 큰 비중을 차지하며, 시장의 소음보다 나만의 기준을 믿고 투자를 이어간 모습이에요. 일시적인 등락에도 흔들리지 않는 단단한 투자 습관이 자리 잡았어요.",
        title: "건강한 리듬이 계속되도록, ", highlight: "판단의 근거", suffix: "를 기록해 두세요",
      }
    },
    "2026-02": {
      weekly: {
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
      },
      monthly: {
        main: "월 초 하락 국면에서는 불안 감정이 두드러졌지만, 이후에는 감정적 개입을 줄이고 시장을 관찰하며 점차 안정적인 판단 흐름을 유지한 기간이었어요.",
        title: "불안이 기록되는 순간, 판단을 ", highlight: "한 번 더 점검", suffix: "해보세요.",
      }
    }
  };

  const monthData = FEEDBACK_REPORTS[yearMonth as string] || FEEDBACK_REPORTS["2026-02"];

  const feedback = isWeekly 
    ? monthData.weekly[week as string] || monthData.weekly["1"]
    : monthData.monthly;

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
              추천
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
