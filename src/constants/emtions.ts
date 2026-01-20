import Calm from '../assets/images/calm.png';
import Anxiety from '../assets/images/anxiety.png';
import Confidence from '../assets/images/confidence.png';
import Greed from '../assets/images/greed.png';
import Regret from '../assets/images/regret.png';

export const EMOTIONS = [
  {
    key: 'CALM',
    label: '평온',
    color: 'bg-emotion-calm',
    bg: '#EEF9FF',
    icon: Calm,
  },
  {
    key: 'ANXIETY',
    label: '불안',
    color: 'bg-emotion-anxiety',
    bg: '#F6ECFC',
    icon: Anxiety,
  },
  {
    key: 'CONFIDENCE',
    label: '확신',
    color: 'bg-emotion-confidence',
    bg: '#FFD9DC',
    icon: Confidence,
  },
  {
    key: 'GREED',
    label: '탐욕',
    color: 'bg-emotion-greed',
    bg: '#FFF8C9',
    icon: Greed,
  },
  {
    key: 'REGRET',
    label: '후회',
    color: 'bg-emotion-regret',
    bg: '#E5E7E7',
    icon: Regret,
  },
] as const;
