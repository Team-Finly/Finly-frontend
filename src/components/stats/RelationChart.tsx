import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { EMOTION_CHART_MAP } from '@/constants/emotions';
import { Tooltip } from 'react-tooltip';
import { useStatsStore } from '@/store/statsStockStore';
import { useDailyChart } from '@/hooks/useStatsAnalysis';
import { apiRenderGuard } from '@/utils/renderGuard';
import type { DailyChartResult } from '@/types/stats';
import { formatMonthDay } from '@/utils/date';

const CustomEmojiDot = (props: any) => {
  const { cx, cy, payload } = props;
  if (!payload.emotionImg) return null;

  return (
    <g>
      <line
        x1={cx}
        y1={cy}
        x2={cx}
        y2={122}
        stroke="#C5C8CE"
        strokeWidth={1}
        strokeDasharray="3 3"
      />
      <image
        x={cx - 14}
        y={cy - 14}
        width={28}
        height={28}
        href={payload.emotionImg}
      />
    </g>
  );
};

const RelationChart = () => {
  const navigate = useNavigate();
  const { currentStock } = useStatsStore();
  const { data, isLoading, isError } = useDailyChart(currentStock?.symbol);

  const guardUI = apiRenderGuard(isLoading, isError, data);
  if (guardUI !== undefined) return guardUI;

  const chartResult = data as DailyChartResult;

  const chartData = chartResult.dailyData.map((item) => {
    const emotionConfig = EMOTION_CHART_MAP[item.mainEmotion];
    return {
      ...item,
      formattedDate: formatMonthDay(item.date),
      emotionImg: emotionConfig?.chartImage || null,
    };
  });

  return (
    <div
      className="cursor-pointer rounded-[12px] border-[1.2px] border-gray-100 bg-white p-5"
      onClick={() => navigate('/stats/analysis')}
      data-tooltip-id="analysis-tooltip"
      data-tooltip-content="눌러서 심층 분석 보러가기"
    >
      <div className="mb-1 text-[16px] font-semibold text-gray-700">
        주가 & 감정 흐름
      </div>
      <div className="mb-6 text-[12px] font-medium text-gray-300">
        종목 가격 변동 시점의 내 마음
      </div>

      <div className="h-[184px] min-h-[184px] rounded-[10px] bg-gray-50 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 15, left: 15, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="1" x2="1" y2="0">
                <stop offset="5%" stopColor="#278DFD" stopOpacity={0} />
                <stop offset="95%" stopColor="#278DFD" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="formattedDate"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#C5C8CE', fontSize: 11 }}
              dy={3}
              interval={1}
            />
            <YAxis hide domain={['auto', 'auto']} />
            <Area
              activeDot={false}
              type="linear"
              dataKey="closePrice"
              stroke="#278DFD"
              strokeWidth={3}
              fill="url(#colorPrice)"
              fillOpacity={1}
              dot={<CustomEmojiDot />}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <Tooltip
        id="analysis-tooltip"
        place="top"
        offset={1}
        style={{
          backgroundColor: '#278DFD',
          color: '#FFFFFF',
          borderRadius: '8px',
          zIndex: 100,
        }}
        className="!rounded-lg !px-3 !py-1.5 !text-[12px]"
        noArrow={false}
      />
    </div>
  );
};

export default RelationChart;
