export type NotificationStatus = "EMPTY" | "UNREAD" | "READ";

export interface Notification {
  id: number;
  title: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}