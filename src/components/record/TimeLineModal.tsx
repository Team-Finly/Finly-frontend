import TimeLineIcon from '@/assets/icons/stats_time.svg';

interface Props {
  onClose: () => void;
}

const TimeLineModal = ({ onClose }: Props) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="rounded-[16px] bg-white px-[25px] py-[30px] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mt-[-4px] mb-[11px] flex items-center justify-center gap-2">
          <img
            src={TimeLineIcon}
            alt="timeline"
          />
        </div>

        <div className="text-center text-[12px] leading-[20px] text-gray-700">
          <span className="block">
            장 전: 09:00 이전 / 오전: 09:00 ~ 12:00
          </span>
          <span className="block">
            오후: 12:00 ~ 15:30 / 장 후: 15:30 이후
          </span>
        </div>
      </div>
    </div>
  );
};

export default TimeLineModal;
