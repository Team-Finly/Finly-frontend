import type { Notification } from "@/types/notification";
import DocumentIcon from "@/assets/icons/document.svg";

type Props = {
  notification: Notification;
};

const NotificationItem = ({ notification }: Props) => {
  const { title, createdAt, isRead } = notification;

  return (
    <div
      className={`flex items-start gap-3 px-[24px] py-[22px] ${
        !isRead ? "bg-[#F0F6FFCC]" : "bg-white"
      }`}
    >
      <div className="relative">
        <div className={`w-[43px] h-[43px] rounded-full ${
        !isRead ? "bg-white" : "bg-[#F4F5F7]"
      } flex items-center justify-center`}>
          <img src={DocumentIcon} alt="알림 아이콘" className="w-[16px] h-[19px]" />
        </div>

        {/* 안 읽은 알림 dot */}
        {!isRead && (
          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red rounded-full" />
        )}
      </div>

      <div className="flex flex-col">
        <p className="text-[14px] pb-[7px] font-semibold text-gray-900">
          {title}
        </p>
        <p className="text-[12px] text-gray-400">
          {createdAt}
        </p>
      </div>
    </div>
  );
};

export default NotificationItem;
