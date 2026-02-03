import Before from '@/assets/icons/before.svg';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
}

const DailyDetailHeader = ({ title }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 z-1 w-full max-w-120 border-b border-gray-100 bg-white">
      <div className="relative mt-4 flex h-15 items-center justify-center bg-white px-4">
        <button
          className="absolute left-4 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <img className="h-4 w-2" src={Before} alt="이전" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        <button className="absolute right-4 text-[16px] text-gray-500">
          수정
        </button>
      </div>
    </div>
  );
};

export default DailyDetailHeader;