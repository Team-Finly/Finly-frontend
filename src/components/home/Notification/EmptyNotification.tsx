import Bell from "@/assets/icons/bell.svg";

const EmptyNotification = () => (
  <div className="flex flex-col items-center justify-center h-[55vh]">
    <img src={Bell} alt="알림 아이콘" className="w-[24px] h-[28px]" />
    <p className="mt-[21px] text-[18px] text-gray-500 font-semibold">
      새로운 알림이 없어요
    </p>
    <p className="mt-[22px] text-[14px] text-gray-300">
      새로운 소식이 있으면 알려드릴게요
    </p>
  </div>
);

export default EmptyNotification;