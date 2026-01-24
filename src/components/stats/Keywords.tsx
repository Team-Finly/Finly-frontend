const MOCK_DATA = {
  topKeywords: [
    '#단어',
    '#가슴철렁',
    '#삼전본전',
    '#급등주',
    '#냠',
    '#핀리',
    '#뉴스공시',
    '#가나다라',
  ],
};

const Keywords = () => {
  const { topKeywords } = MOCK_DATA;
  const reorderedKeywords = (() => {
    const top3 = topKeywords.slice(0, 3);
    const others = topKeywords.slice(3, 8);
    const result = new Array(8).fill('');
    result[2] = top3[0];
    result[4] = top3[1];
    result[6] = top3[2];
    let otherIdx = 0;
    for (let i = 0; i < 8; i++) {
      if (!result[i]) {
        result[i] = others[otherIdx++] || '';
      }
    }
    return result;
  })();

  const row1 = reorderedKeywords.slice(0, 4);
  const row2 = reorderedKeywords.slice(4, 8);
  const baseStyle =
    'flex items-center justify-center rounded-[16px] text-[13px] font-medium px-2 py-1';
  const blueStyle = 'bg-blue-bg/50 text-secondary font-semibold';
  const grayStyle = 'bg-gray-50 text-gray-500 font-medium';

  return (
    <div className="rounded-xl border-[1.2px] border-gray-100 bg-white p-5">
      <div className="mb-1 text-[16px] font-semibold text-gray-700">
        나를 흔든 키워드
      </div>
      <div className="mb-6 text-[12px] font-medium text-gray-300">
        메모에 가장 많이 쓴 단어들이에요
      </div>
      <div className="flex flex-col gap-4 px-1">
        <div className="flex flex-row justify-start gap-2">
          {row1.map((keyword, i) => {
            const isBlue = i === 2;
            if (!keyword) return null;
            return (
              <div
                key={`row1-${i}`}
                className={`${baseStyle} ${isBlue ? blueStyle : grayStyle}`}
              >
                {keyword}
              </div>
            );
          })}
        </div>
        <div className="flex flex-row justify-start gap-2">
          {row2.map((keyword, i) => {
            const isBlue = i === 0 || i === 2;
            if (!keyword) return null;
            return (
              <div
                key={`row2-${i}`}
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
