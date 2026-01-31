import { useNavigate } from 'react-router-dom';
import CloseIcon from '@/assets/icons/close-bright.svg';

interface Props {
  title: string;
}

const ReportDetailHeader = ({ title }: Props) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 flex h-[76px] pt-[25px] items-center justify-between bg-[#0A1C31] px-[17px] backdrop-blur">
      <h1 className="text-[18px] font-semibold text-gray-300 mb-[-4px]">{title}</h1>
      <button onClick={() => navigate(-1)}>
        <img src={CloseIcon} alt="닫기" className="w-[16px] h-[16px] cursor-pointer" />
      </button>
    </header>
  );
};

export default ReportDetailHeader;
