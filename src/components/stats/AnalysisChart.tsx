import { EMOTION_CHART_MAP } from '@/constants/emotions';
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface AnalysisChartProps {
  data: any[];
  onDataSelect: (data: any) => void;
}

const EmotionMarkerDot = (props: any) => {
  const { cx, cy, payload } = props;
  if (!payload?.record) return null;
  const emotionConfig = EMOTION_CHART_MAP[payload.record.emotionCode];
  if (!emotionConfig?.chartImage) return null;

  return (
    <g>
      <line
        x1={cx}
        y1={cy}
        x2={cx}
        y2={245}
        stroke="#C5C8CE"
        strokeWidth={1}
        strokeDasharray="3 3"
      />
      <image
        x={cx - 14}
        y={cy - 14}
        width={28}
        height={28}
        href={emotionConfig.chartImage}
      />
    </g>
  );
};

const ActiveInteractionDot = (props: any) => {
  const { cx, cy } = props;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={5.5}
      fill="#278DFD"
      stroke="white"
      strokeWidth={4}
    />
  );
};

const AnalysisChart = ({ data, onDataSelect }: AnalysisChartProps) => {
  const handleMove = (state: any) => {
    if (
      state?.activeTooltipIndex !== undefined &&
      state.activeTooltipIndex !== null
    ) {
      const item = data[state.activeTooltipIndex];

      if (item?.record) {
        onDataSelect({ ...item });
      }
    }
  };

  return (
    <div className="relative w-full">
      <style>{`
        .recharts-wrapper,
        .recharts-wrapper *,
        .recharts-surface,
        .recharts-layer {
          outline: none !important;
          box-shadow: none !important;
          -webkit-tap-highlight-color: transparent !important;
          -webkit-touch-callout: none !important;
          -webkit-user-select: none !important;
          user-select: none !important;
          touch-action: none;
        }
        *:focus {
          outline: none !important;
        }
      `}</style>
      <div className="h-75 w-full border border-gray-100 bg-gray-50/60 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 0, right: 0, left: 10, bottom: 10 }}
            onMouseMove={handleMove}
            onTouchMove={handleMove}
          >
            <XAxis
              dataKey="time"
              ticks={['09:00', '11:00', '13:00', '15:30']}
              tickLine={false}
              axisLine={{ stroke: '#EEEFF0', strokeWidth: 1 }}
              tick={{ fill: '#6E757D', fontSize: 11, opacity: 0.6 }}
              interval="preserveStartEnd"
              padding={{ left: 20, right: 20 }}
            />

            <YAxis
              orientation="right"
              domain={['auto', 'auto']}
              tickLine={false}
              axisLine={{ stroke: '#EEEFF0', strokeWidth: 1 }}
              tick={{ fill: '#6E757D', fontSize: 11, opacity: 0.6 }}
              tickCount={4}
              width={50}
              tickFormatter={(value) => `${value.toLocaleString()}`}
              padding={{ top: 50, bottom: 30 }}
            />

            <Tooltip
              content={() => null}
              cursor={false}
              isAnimationActive={false}
              wrapperStyle={{ pointerEvents: 'none' }}
            />

            <Line
              type="linear"
              dataKey="closePrice"
              stroke="#278DFD"
              strokeWidth={3}
              strokeLinejoin="round"
              strokeLinecap="round"
              dot={<EmotionMarkerDot />}
              activeDot={<ActiveInteractionDot />}
              connectNulls={true}
              animationDuration={500}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="h-[16px] border-t border-gray-100 bg-gray-50"></div>
    </div>
  );
};

export default React.memo(AnalysisChart);
