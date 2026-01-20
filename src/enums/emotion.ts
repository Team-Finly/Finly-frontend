import StatsConvictionImg from '../assets/images/stats_conviction.svg';
import StatsAnxietyImg from '../assets/images/stats_anxiety.svg';
import StatsGreedImg from '../assets/images/stats_greed.svg';
import StatsRegretImg from '../assets/images/stats_regret.svg';
import StatsCalmImg from '../assets/images/stats_calm.svg';
import StatsCardConvictionImg from '../assets/images/stats_card_conviction.svg';
import StatsCardAnxietyImg from '../assets/images/stats_card_anxiety.svg';
import StatsCardGreedImg from '../assets/images/stats_card_greed.svg';
import StatsCardRegretImg from '../assets/images/stats_card_regret.svg';
import StatsCardCalmImg from '../assets/images/stats_card_calm.svg';

// 감정 종류
export const EMOTION_TYPE = {
  CONVICTION: 'CONVICTION', // 확신
  ANXIETY: 'ANXIETY', // 불안
  GREED: 'GREED', // 탐욕
  REGRET: 'REGRET', // 후회
  CALM: 'CALM', // 평온
} as const;

// 타입 추출
export type EmotionType = (typeof EMOTION_TYPE)[keyof typeof EMOTION_TYPE];

// 한글과 매칭
export const EMOTION_LABEL_MAP: Record<string, EmotionType> = {
  확신: EMOTION_TYPE.CONVICTION,
  불안: EMOTION_TYPE.ANXIETY,
  탐욕: EMOTION_TYPE.GREED,
  후회: EMOTION_TYPE.REGRET,
  평온: EMOTION_TYPE.CALM,
};

// 통계 페이지용 IMG 매핑
export const STATS_EMOTION_EMOJI = {
  [EMOTION_TYPE.CONVICTION]: StatsConvictionImg,
  [EMOTION_TYPE.ANXIETY]: StatsAnxietyImg,
  [EMOTION_TYPE.GREED]: StatsGreedImg,
  [EMOTION_TYPE.REGRET]: StatsRegretImg,
  [EMOTION_TYPE.CALM]: StatsCalmImg,
};

// 최근 기록 카드용 IMG 매핑
export const CARD_EMOTION_IMAGE = {
  [EMOTION_TYPE.CONVICTION]: StatsCardConvictionImg,
  [EMOTION_TYPE.ANXIETY]: StatsCardAnxietyImg,
  [EMOTION_TYPE.GREED]: StatsCardGreedImg,
  [EMOTION_TYPE.REGRET]: StatsCardRegretImg,
  [EMOTION_TYPE.CALM]: StatsCardCalmImg,
};
