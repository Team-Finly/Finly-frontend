export const getRelativeTime = (dateString: string): string => {
  const now = new Date();
  const recordedDate = new Date(dateString);

  now.setHours(0, 0, 0, 0);
  recordedDate.setHours(0, 0, 0, 0);

  const diffInMs = now.getTime() - recordedDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 0) return '미래';
  if (diffInDays === 0) return '오늘';
  if (diffInDays < 7) return `${diffInDays}일 전`;

  const diffInWeeks = Math.floor(diffInDays / 7);
  return `${diffInWeeks}주 전`;
};
