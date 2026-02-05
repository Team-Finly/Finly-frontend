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

// 오늘 날짜 -> YYYY-MM-DD
export const getTodayString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// "YYYY-MM-DD" -> "M월 D일"
export const formatDateDisplay = (dateString: string) => {
  if (!dateString) return '';
  const [, month, day] = dateString.split('-');
  return `${parseInt(month)}월 ${parseInt(day)}일`;
};

// "YYYY-MM-DD" -> "YYYY.M.D (요일)"
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString.replace(/\./g, '-'));
  if (isNaN(date.getTime())) return dateString;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = weekDays[date.getDay()];

  return `${year}. ${month}. ${day} (${dayOfWeek})`;
};

// ISO 시간 문자열 -> "오후 0시 00분 기록"
export const formatTime = (isoString: string) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? '오후' : '오전';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, '0');

  return `${ampm} ${displayHours}시 ${displayMinutes}분 기록`;
};

export const formatMonthDay = (dateString: string): string => {
  if (!dateString) return '';

  const date = new Date(dateString.replace(/\./g, '-'));
  if (isNaN(date.getTime())) return dateString;

  const month = date.getMonth() + 1; 
  const day = date.getDate();       

  return `${month}.${day}`;
};
