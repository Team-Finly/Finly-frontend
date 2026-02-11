interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MindScoreInfoModal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose} 
    >
      <div className="absolute inset-0 bg-black/50 " />
      <div 
        className="relative bg-white rounded-[16px] px-[30px] py-[26px] shadow-xl"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex flex-col items-center text-center tracking-tight">
          <p className="text-[12px] text-gray-700 leading-[20px]">
            <span className="font-semibold">금융마음지수(FMI)</span>는 투자 중 감정과 판단을
            <br />
            얼마나 이성적으로 관리했는지 보여주는 지표예요.
          </p>

          <div className="mt-[10px] text-[12px] text-gray-700 leading-[20px]">
            <p>수익이 아닌 멘탈과 기록 습관을 기준으로</p>
            <p>나의 <span className="font-semibold">투자 태도</span>를 돌아볼 수 있어요.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MindScoreInfoModal;