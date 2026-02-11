export type NotificationStatus = 'EMPTY' | 'UNREAD' | 'READ';

export interface Notification {
  id: number;
  title: string;
  isRead: boolean;
  createdAt: string;
  url: string;
}
