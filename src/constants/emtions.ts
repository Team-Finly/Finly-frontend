import Calm from '../assets/images/calm.png';
import Anxiety from '../assets/images/anxiety.png';
import Confidence from '../assets/images/confidence.png';
import Greed from '../assets/images/greed.png';
import Regret from '../assets/images/regret.png';

export const EMOTIONS = [
  {
    key: 'CONFIDENCE',
    label: '확신',
    color: 'var(--color-emotion-confidence)',
    bgColor: 'var(--color-emotion-bg-confidence)',
    icon: Confidence,
  },
  {
    key: 'ANXIETY',
    label: '불안',
    color: 'var(--color-emotion-anxiety)',
    bgColor: 'var(--color-emotion-bg-anxiety)',
    icon: Anxiety,
  },
  {
    key: 'GREED',
    label: '탐욕',
    color: 'var(--color-emotion-greed)',
    bgColor: 'var(--color-emotion-bg-greed)',
    textColor: 'var(--color-emotion-text-greed)',
    icon: Greed,
  },
  {
    key: 'REGRET',
    label: '후회',
    color: 'var(--color-emotion-regret)',
    bgColor: 'var(--color-emotion-bg-regret)',
    icon: Regret,
  },
  {
    key: 'CALM',
    label: '평온',
    color: 'var(--color-emotion-calm)',
    bgColor: 'var(--color-emotion-bg-calm)',
    icon: Calm,
  },
] as const;
