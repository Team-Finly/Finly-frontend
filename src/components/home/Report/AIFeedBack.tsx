

const AIFeedBack = () => {
  return (
    <section className="mt-[50px]">
      <h3 className="mb-[20px] text-[17px] font-semibold">AI 피드백</h3>
      <div
        className="relative overflow-hidden rounded-xl border-[1.2px] border-[#4E5660]"
      >
        <div className="absolute inset-0 bg-[#0C2138CC]" />
        <div className="absolute inset-0 bg-white/10" />

        <div className="relative px-[16px] py-[20px] text-[14px] leading-relaxed">
          <p>
            월 초 하락 국면에서는 불안 감정이 두드러졌지만, 이후에는 감정적 개입을 줄이고
            시장을 관찰하며 점차 안정적인 판단 흐름을 유지한 기간이었어요.
          </p>

          <div className="mt-[20px]">
            <span className="inline-block rounded bg-[#0A1D32] px-[8px] py-[2px] text-[13px] font-semibold text-[#278DFDCC]">
              추천
            </span>

            <p className="mt-[6px] text-[14px] font-semibold leading-relaxed">
              불안이 기록되는 순간, 판단을{' '}
              <span className="bg-[#3E9AFF4D] px-1 py-[2px]">
                한 번 더 점검
              </span>
              해보세요
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AIFeedBack;
