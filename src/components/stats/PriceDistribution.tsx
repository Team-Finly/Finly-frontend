import SimpleProgressBar from './SimpleProgressBar';

interface DistributionItem {
  range: string;
  count: number;
  ratio: number;
}

const MOCK_DATA = {
  isSuccess: true,
  code: 'COMMOM200',
  message: '성공적으로 요청을 처리했습니다.',
  result: [
    { range: '~70000', count: 3, ratio: 15 },
    { range: '70000~75000', count: 14, ratio: 70 },
    { range: '75000+', count: 3, ratio: 15 },
  ],
};

const formatRangeLabel = (rangeStr: string) => {
  if (rangeStr.startsWith('~')) {
    const num = Number(rangeStr.replace('~', ''));
    return `${num.toLocaleString()}원 미만`;
  }
  if (rangeStr.endsWith('+')) {
    const num = Number(rangeStr.replace('+', ''));
    return `${num.toLocaleString()}원 초과`;
  }
  if (rangeStr.includes('~')) {
    const [min, max] = rangeStr.split('~').map(Number);
    return `${min.toLocaleString()}원 ~ ${max.toLocaleString()}원`;
  }
  return rangeStr;
};

const PriceDistribution = () => {
  const distData: DistributionItem[] = MOCK_DATA.result;

  return (
    <div className="rounded-[12px] border-[1.2px] border-gray-100 bg-white p-5">
      <div className="mb-1 text-[16px] font-semibold text-gray-700">
        가격대별 기록 분포
      </div>
      <div className="mb-6 text-[12px] font-medium text-gray-300">
        주로 어떤 가격대에서 결정하셨나요?
      </div>
      <div className="flex flex-col gap-5">
        {distData.map((item, index) => {
          const label = formatRangeLabel(item.range);
          const barColor = item.ratio >= 50 ? 'bg-secondary' : 'bg-gray-300';

          return (
            <SimpleProgressBar
              key={index}
              label={label}
              percentage={item.ratio}
              colorClass={barColor}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PriceDistribution;
