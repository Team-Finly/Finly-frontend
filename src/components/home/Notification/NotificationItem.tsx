const NotificationItem = ({ alarm }: any) => (
  <div
    className={`p-4 border-b ${
      !alarm.isRead ? "bg-blue-50" : "bg-white"
    }`}
  >
    <p className="text-sm font-medium">{alarm.title}</p>
    <p className="text-xs text-gray-500">{alarm.content}</p>

    {!alarm.isRead && (
      <span className="mt-1 inline-block text-[10px] text-blue-600">
        NEW
      </span>
    )}
  </div>
);

export default NotificationItem;