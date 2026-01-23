import EmptyNotification from "@/components/home/Notification/EmptyNotification";
import NotificationItem from "@/components/home/Notification/NotificationItem";
import TitleHeader from "@/components/record/TitleHeader";

const NotificationPage = () => {
  const alarms = []; // API 결과

  const hasNewAlarm = alarms.some(a => !a.isRead);
  return (
    <>
      <TitleHeader title="알림" />

      {alarms.length === 0 ? (
        <EmptyNotification />
      ) : (
        <div>
          {hasNewAlarm && (
            <p className="px-4 py-2 text-xs text-blue-600">
              새로운 알림이 있어요
            </p>
          )}

          {alarms.map(alarm => (
            <NotificationItem key={alarm.id} alarm={alarm} />
          ))}
        </div>
      )}
    </>
  )
}

export default NotificationPage;