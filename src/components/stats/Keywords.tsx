const MOCK_DATA = {
  topKeywords: [
    '#급등주',
    '#유튜브추천',
    '#가슴철렁',
    '#삼전본전',
    '#뉴스공시',
    '#최대다섯글자?',
  ],
};

const Keywords = () => {
  const { topKeywords } = MOCK_DATA;
  const row1 = topKeywords.slice(0, 3);
  const row2 = topKeywords.slice(3, 6);
  const baseStyle =
    'flex items-center justify-center rounded-[16px] text-[13px] font-medium px-3 py-2';
  const blueStyle = 'bg-blue-bg/50 text-secondary font-semibold';
  const grayStyle = 'bg-gray-50 text-gray-500 font-medium';

  return (
    <div className="rounded-xl border-[1.2px] border-gray-100 bg-white p-5">
      <div className="mb-1 text-[16px] font-semibold text-gray-700">
        나를 흔든 키워드
      </div>
      <div className="mb-6 text-[12px] font-medium text-gray-300">
        일기에 가장 많이 쓴 단어들이에요
      </div>
      <div className="flex flex-col gap-4 px-1">
        <div className="flex flex-row gap-3">
          {row1.map((keyword, index) => {
            const isBlue = index === 2;
            return (
              <div
                key={`${keyword}-${index}`}
                className={`${baseStyle} ${isBlue ? blueStyle : grayStyle}`}
              >
                {keyword}
              </div>
            );
          })}
        </div>
        <div className="ml-6 flex flex-row gap-3">
          {row2.map((keyword, index) => {
            const isBlue = index === 1;
            return (
              <div
                key={`${keyword}-${index}`}
                className={`${baseStyle} ${isBlue ? blueStyle : grayStyle}`}
              >
                {keyword}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Keywords;
