// 위클리 무드
export interface WeeklyMoodItem {
  dayOfWeek: string;
  hasRecord: boolean;
  emotion: string | null;
}

export interface WeeklyMoodResponse {
  days: WeeklyMoodItem[];
}