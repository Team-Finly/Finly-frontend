import checkIcon from '@/assets/icons/isvalid.svg';

interface OptionCardProps {
  content: string; // 옵션 내용
  isSelected: boolean; // 선택 여부
  onClick: () => void; // 클릭 함수
}

const OptionCard = ({ content, isSelected, onClick }: OptionCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer mb-[16px] flex items-center justify-between rounded-[12px] border-[1.2px] py-[15px] pl-[17px] transition-all ${
        isSelected
          ? 'border-secondary bg-blue-bg/80 font-medium text-gray-700'
          : 'border-gray-300 text-gray-700'
      } `}
    >
      <span>{content}</span>
      {isSelected && (
        <img
          src={checkIcon}
          alt="체크"
          className="mr-[14.5px] ml-[15px] h-5 w-5"
        />
      )}
    </div>
  );
};

export default OptionCard;
