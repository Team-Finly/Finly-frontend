import type { Notification } from '@/types/notification';
import DocumentIcon from '@/assets/icons/document.svg';

type Props = {
  notification: Notification;
  onClick?: () => void;
};

const NotificationItem = ({ notification, onClick }: Props) => {
  const { title, createdAt, isRead } = notification;

  return (
    <div
      className={`flex cursor-pointer items-start gap-3 px-[24px] py-[22px] ${
        !isRead ? 'bg-[#F0F6FFCC]' : 'bg-white'
      }`}
      onClick={onClick}
    >
      <div className="relative">
        <div
          className={`h-[43px] w-[43px] rounded-full ${
            !isRead ? 'bg-white' : 'bg-[#F4F5F7]'
          } flex items-center justify-center`}
        >
          <img
            src={DocumentIcon}
            alt="알림 아이콘"
            className="h-[19px] w-[16px]"
          />
        </div>

        {/* 안 읽은 알림 dot */}
        {!isRead && (
          <span className="bg-red absolute top-0.5 right-0.5 h-2 w-2 rounded-full" />
        )}
      </div>

      <div className="flex flex-col">
        <p className="pb-[7px] text-[14px] font-semibold text-gray-900">
          {title}
        </p>
        <p className="text-[12px] text-gray-400">{createdAt}</p>
      </div>
    </div>
  );
};

export default NotificationItem;
