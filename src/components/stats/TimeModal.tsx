import TimeIcon from '@/assets/icons/stats_time.svg';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const TimeModal = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="flex w-[290px] flex-col items-center gap-3.5 rounded-[12px] bg-white px-5 py-7"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={TimeIcon} alt="물음표" className="h-[18px] w-[18px]" />

        <div className="text-center text-[12px] text-gray-700">
          <div className="mb-1">장 전: 09:00 이전 / 오전: 09:00 ~ 12:00</div>
          <div>오후: 12:00 ~ 15:30 / 장 후: 15:30 이후</div>
        </div>
      </div>
    </div>
  );
};

export default TimeModal;
