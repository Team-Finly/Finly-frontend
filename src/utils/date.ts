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

// "YYYY-MM-DD" -> "YYYY.M.D"
export const formatDate2 = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString.replace(/\./g, '-'));
  if (isNaN(date.getTime())) return dateString;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
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

export const formatTime2 = (dateString: string) => {
  const date = new Date(dateString);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const period = hours < 12 ? '오전' : '오후';
  const displayHour = hours % 12 === 0 ? 12 : hours % 12;

  return `${period} ${displayHour}시 ${minutes}분`;
};
