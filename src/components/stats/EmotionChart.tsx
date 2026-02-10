import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { EMOTION_CHART_MAP, CHART_ORDER } from '@/constants/emotions';
import { useStatsStore } from '@/store/statsStockStore';
import { useEmotionDistribution } from '@/hooks/useEmotionTab';
import { apiRenderGuard } from '@/utils/renderGuard';
import type { StockEmotionDistribution } from '@/types/stats';
import { UniversalSkeleton } from '@/components/UniversalSkeleton';

const EmotionChartSkeleton = () => (
  <div className="flex items-center justify-center rounded-xl border-[1.2px] border-gray-100 bg-white p-5">
    <UniversalSkeleton className="h-[162px] w-[320px] rounded-md bg-gray-100" />
  </div>
);

const EmotionChart = () => {
  const { currentStock } = useStatsStore();
  const { data, isLoading, isError } = useEmotionDistribution(
    currentStock?.symbol,
  );

  const guardUI = apiRenderGuard(
    isLoading,
    isError,
    data,
    <EmotionChartSkeleton />,
  );
  if (guardUI !== undefined) return guardUI;

  const emotionData = data as StockEmotionDistribution;

  const chartData = CHART_ORDER.map((key) => {
    const found = emotionData.typeSummary?.find((item) => item.type === key);
    return {
      subject: key,
      value: found ? found.percent : 0,
      full: 100,
    };
  });

  const renderCustomTick = ({ payload, x, y, textAnchor }: any) => {
    const key = payload.value;
    const config = EMOTION_CHART_MAP[key];

    if (!config) return <g />;

    const width = 60;
    const height = 20;

    let newX = x;
    let justifyClass = 'justify-start';

    if (textAnchor === 'end') {
      newX = x - width;
      justifyClass = 'justify-end';
    } else if (textAnchor === 'middle') {
      newX = x - width / 2;
      justifyClass = 'justify-center';
    }

    return (
      <foreignObject x={newX} y={y - 10} width={width} height={height}>
        <div
          className={`flex h-full w-full items-center gap-1.5 ${justifyClass}`}
        >
          <div
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: config.color }}
          />

          <span className="text-[11px] font-medium whitespace-nowrap text-[#6E757D]">
            {config.label}
          </span>
        </div>
      </foreignObject>
    );
  };

  return (
    <div className="flex items-center justify-center rounded-xl border-[1.2px] border-gray-100 bg-white p-5">
      <div className="mt-2 h-[162px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid gridType="polygon" stroke="#EEEFF0" />
            <PolarAngleAxis dataKey="subject" tick={renderCustomTick} />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={false}
              axisLine={false}
            />
            <Radar
              name="Background"
              dataKey="full"
              fill="#F4F5F7"
              stroke="none"
              fillOpacity={0.6}
              isAnimationActive={false}
              dot={false}
              activeDot={false}
            />
            <Radar
              name="Emotion"
              dataKey="value"
              fill="#278DFD"
              fillOpacity={0.3}
              stroke="#278DFD"
              strokeWidth={1}
              dot={false}
              activeDot={false}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmotionChart;
