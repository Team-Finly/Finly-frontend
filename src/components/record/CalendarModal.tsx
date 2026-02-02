import Calendar from '@/components/record/Calendar';

interface Props {
  onClose: () => void;
}

const CalendarModal = ({ onClose }: Props) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="relative w-[90%] max-w-[360px] rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Calendar onClose={onClose} />
      </div>
    </div>
  );
};

export default CalendarModal;