import EmptyNotification from '@/components/home/Notification/EmptyNotification';
import NotificationItem from '@/components/home/Notification/NotificationItem';
import TitleHeader from '@/components/record/TitleHeader';
import { useNavigate } from 'react-router-dom';

const NotificationPage = () => {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: '2월 둘째 주 위클리 리포트가 도착했어요!',
      isRead: false,
      createdAt: '21시간 전',
      url: '/reports/2026-02/2',
    },
    {
      id: 2,
      title: '2월 첫째 주 위클리 리포트가 도착했어요!',
      isRead: true,
      createdAt: '7일 전',
      url: '/reports/2026-01/1',
    },
  ];

  return (
    <>
      <TitleHeader title="알림" />
      <div className="pt-[77px]">
        {notifications.length === 0 ? (
          <EmptyNotification />
        ) : (
          <div>
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClick={() => navigate(notification.url)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationPage;
