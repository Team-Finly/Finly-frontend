import checkIcon from '../../assets/icons/isvalid.svg';

interface OptionCardProps {
  content: string;               // 옵션 내용
  isSelected: boolean;          // 선택 여부
  onClick: () => void;         // 클릭 함수
}

const OptionCard = ({ content, isSelected, onClick }: OptionCardProps) => {

  return (
    <div
      onClick={onClick}
      className={`py-[15px] pl-[17px] border-[1.2px] rounded-[12px]  mb-[16px] transition-all flex items-center justify-between
        ${isSelected 
          ? 'border-secondary bg-blue-bg/80 text-gray-700 font-medium' 
          : 'border-gray-300 text-gray-700'
        }
      `}
    >
      <span>{content}</span>
      {isSelected && (
        <img src={checkIcon} alt="체크" className="w-5 h-5 ml-[15px] mr-[14.5px]" />
      )}
    </div>
  )
}

export default OptionCard
