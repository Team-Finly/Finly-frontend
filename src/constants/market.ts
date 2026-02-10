export const FGI_STATUS = [
  { min: 0, max: 25, label: '극도의 공포' },
  { min: 26, max: 45, label: '공포' },
  { min: 46, max: 55, label: '중립' },
  { min: 56, max: 75, label: '탐욕' },
  { min: 76, max: 100, label: '극도의 탐욕' },
];

export const getFgiLabel = (value: number) => {
  const status = FGI_STATUS.find((s) => value >= s.min && value <= s.max);
  return status ? status.label : '데이터 없음';
};
