import TelescopeIcon from '@/assets/images/Telescope.svg';
import Bell from '@/assets/icons/bell.svg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white flex h-[60px] w-full items-center bg-white justify-between p-4 pb-[9px]">
        <div className="flex gap-2 bg-blue-bg items-center px-[16px] py-[9px] rounded-full text-[13px] text-gray-700">
          <img src={TelescopeIcon} alt="망원경 아이콘" className="w-5 h-5" />
          <span>코스피 255</span>
          <span>코스닥 852</span>
        </div>
      <button
        className="relative px-[4px]"
        onClick={() => navigate('/alarm')}
      >
          <img src={Bell} alt="알림 아이콘" className="w-6 h-6" />
          <span className="absolute top-[-6px] right-[2px] w-2.5 h-2.5 bg-red rounded-full border-2 border-white"></span>
        </button>
      </header>
  );
};

export default Header;
