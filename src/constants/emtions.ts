// 감정 단일 이미지
import Calm from '../assets/images/calm.png';
import Anxiety from '../assets/images/anxiety.png';
import Confidence from '../assets/images/confidence.png';
import Greed from '../assets/images/greed.png';
import Regret from '../assets/images/regret.png';
// 감정 차트 이미지
import StatsConvictionImg from '../assets/images/stats_conviction.svg';
import StatsAnxietyImg from '../assets/images/stats_anxiety.svg';
import StatsGreedImg from '../assets/images/stats_greed.svg';
import StatsRegretImg from '../assets/images/stats_regret.svg';
import StatsCalmImg from '../assets/images/stats_calm.svg';
// 감정 카드 이미지
import StatsCardConvictionImg from '../assets/images/stats_card_conviction.svg';
import StatsCardAnxietyImg from '../assets/images/stats_card_anxiety.svg';
import StatsCardGreedImg from '../assets/images/stats_card_greed.svg';
import StatsCardRegretImg from '../assets/images/stats_card_regret.svg';
import StatsCardCalmImg from '../assets/images/stats_card_calm.svg';

export const EMOTIONS = [
  {
    key: 'ANXIETY',
    label: '불안',
    color: 'var(--color-emotion-anxiety)',
    bgColor: 'var(--color-emotion-bg-anxiety)',
    icon: Anxiety,
    chartImage: StatsAnxietyImg,
    cardImage: StatsCardAnxietyImg,
  },
  {
    key: 'GREED',
    label: '탐욕',
    color: 'var(--color-emotion-greed)',
    bgColor: 'var(--color-emotion-bg-greed)',
    textColor: 'var(--color-emotion-text-greed)',
    icon: Greed,
    chartImage: StatsGreedImg,
    cardImage: StatsCardGreedImg,
  },
  {
    key: 'CALM',
    label: '평온',
    color: 'var(--color-emotion-calm)',
    bgColor: 'var(--color-emotion-bg-calm)',
    icon: Calm,
    chartImage: StatsCalmImg,
    cardImage: StatsCardCalmImg,
  },
  {
    key: 'CONFIDENCE',
    label: '확신',
    color: 'var(--color-emotion-confidence)',
    bgColor: 'var(--color-emotion-bg-confidence)',
    icon: Confidence,
    chartImage: StatsConvictionImg,
    cardImage: StatsCardConvictionImg,
  },
  {
    key: 'REGRET',
    label: '후회',
    color: 'var(--color-emotion-regret)',
    bgColor: 'var(--color-emotion-bg-regret)',
    icon: Regret,
    chartImage: StatsRegretImg,
    cardImage: StatsCardRegretImg,
  },
] as const;

export const CHART_ORDER = ['CONFIDENCE', 'CALM', 'REGRET', 'GREED', 'ANXIETY'];

export const EMOTION_CHART_MAP = EMOTIONS.reduce(
  (acc, cur) => {
    acc[cur.key] = cur;
    return acc;
  },
  {} as Record<string, (typeof EMOTIONS)[number]>,
);
