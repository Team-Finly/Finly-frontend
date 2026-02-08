import type { PeriodType } from '@/types/record';

export const PERIODS: { label: string; key: PeriodType }[] = [
  { label: 'ALL', key: 'ALL' },
  { label: '1개월', key: 'MONTH_1' },
  { label: '3개월', key: 'MONTH_3' },
  { label: '6개월', key: 'MONTH_6' },
  { label: '1년', key: 'YEAR_1' },
];
