import CautionIcon from '@/assets/images/stats_caution.svg';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CalculationInfoModal = ({ isOpen, onClose }: Props) => {
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
        <img src={CautionIcon} alt="알림" className="h-[16px] w-[16px]" />

        <div className="text-center text-[12px] text-gray-700">
          <div className="mb-1">
            결과는 사용자가 입력한 매매가를 기준으로 계산돼요
          </div>
          <div>실제 체결가나 시장 수익률과는 다를 수 있어요</div>
        </div>
      </div>
    </div>
  );
};

export default CalculationInfoModal;
