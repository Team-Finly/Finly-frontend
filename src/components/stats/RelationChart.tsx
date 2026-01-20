import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { STATS_EMOTION_EMOJI, EMOTION_LABEL_MAP } from '../../enums/emotion';

interface DailyPrice {
  date: string;
  close_price: number;
}
interface EmotionSummary {
  date: string;
  emotion: string;
  strength: number;
  record_count: number;
}
interface ChartDataResponse {
  stock_id: number;
  stock_name: string;
  daily_prices: DailyPrice[];
  emotions_summary: EmotionSummary[];
}

const MOCK_DATA: ChartDataResponse = {
  stock_id: 27,
  stock_name: '삼성전자',
  daily_prices: [
    { date: '2026-02-14', close_price: 65000 },
    { date: '2026-02-15', close_price: 65400 },
    { date: '2026-02-16', close_price: 65200 },
    { date: '2026-02-17', close_price: 65800 },
    { date: '2026-02-18', close_price: 66000 },
    { date: '2026-02-19', close_price: 65500 },
    { date: '2026-02-20', close_price: 66100 },
  ],
  emotions_summary: [
    { date: '2026-02-17', emotion: '불안', strength: 3, record_count: 2 },
    { date: '2026-02-19', emotion: '확신', strength: 2, record_count: 1 },
  ],
};

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
        x={cx - 12}
        y={cy - 12}
        width={24}
        height={24}
        href={payload.emotionImg}
        style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.1))' }}
      />
    </g>
  );
};

const RelationChart = () => {
  const navigate = useNavigate();

  const chartData = useMemo(() => {
    return MOCK_DATA.daily_prices.map((priceItem) => {
      const emotionItem = MOCK_DATA.emotions_summary.find(
        (e) => e.date === priceItem.date,
      );

      let emotionImg = null;

      if (emotionItem) {
        const emotionType = EMOTION_LABEL_MAP[emotionItem.emotion];
        if (emotionType) {
          emotionImg = STATS_EMOTION_EMOJI[emotionType];
        }
      }

      const dateObj = new Date(priceItem.date);
      const formattedDate = `${dateObj.getMonth() + 1}.${String(dateObj.getDate()).padStart(2, '0')}`;

      return {
        ...priceItem,
        formattedDate,
        emotionImg,
        hasEmotion: !!emotionImg,
      };
    });
  }, []);

  return (
    <div
      className="cursor-pointer rounded-[12px] border-[1.2px] border-gray-100 bg-white p-5"
      onClick={() => navigate('/stats/analysis')}
    >
      <div className="mb-1 text-[16px] font-semibold text-gray-700">
        주가 & 감정 흐름
      </div>
      <div className="mb-6 text-[12px] font-medium text-gray-300">
        종목 가격 변동 시점의 내 마음
      </div>

      <div className="h-[184px] rounded-[10px] bg-gray-50 p-4">
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
              type="linear"
              dataKey="close_price"
              stroke="#278DFD"
              strokeWidth={3}
              fill="url(#colorPrice)"
              fillOpacity={1}
              dot={<CustomEmojiDot />}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RelationChart;
