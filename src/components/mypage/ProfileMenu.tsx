import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import rightarrow from '@/assets/icons/rightarrow.svg';
import onIcon from '@/assets/icons/on.svg';
import offIcon from '@/assets/icons/off.svg';

interface ProfileMenuProps {
  onLogoutClick: () => void;
}

const ProfileMenu = ({ onLogoutClick }: ProfileMenuProps) => {
  const navigate = useNavigate();
  const [isNotiOn, setIsNotiOn] = useState(true);
  
  return (
    <div className="mx-[16px] mt-[26px] flex flex-col h-[310px] rounded-[12px] border-[1.2px] border-gray-100 px-[20px] bg-white ">
      <button
        type="button"
        onClick={() => navigate('/reportsfeb')}
        className="mb-[20px] mt-[25px] flex w-full cursor-pointer items-center justify-between text-left">
        <div className="flex flex-col">
          <p className="text-[16px] font-semibold text-gray-900">AI 리포트 보관함</p>
          <p className="text-[12px] text-gray-300">주간 월간 리포트 모아보기</p>
        </div>
        <img src={rightarrow} alt="Right Arrow" />
      </button>

      <button
        type="button"
        onClick={() => navigate('/mypersona')}
        className="mb-[29px] flex w-full cursor-pointer items-center justify-between text-left">
        <div className="flex flex-col ">
          <p className="text-[16px] font-semibold text-gray-900">나의 페르소나</p>
          <p className="text-[12px] text-gray-300">테스트 다시하기 | 성향 분석</p>
        </div>
        <img src={rightarrow} alt="Right Arrow" />
      </button>

      <button
        type="button"
        onClick={() => navigate('/profilesettings')} 
        className="mb-[38px] flex w-full cursor-pointer items-center justify-between text-left">
        <div className="flex flex-col">
          <p className="text-[16px] font-semibold text-gray-900">프로필 및 계정 설정</p>
        </div>
        <img src={rightarrow} alt="Right Arrow" />
      </button>

      <div className="flex w-full items-center justify-between">
        <p className="text-[16px] font-semibold text-gray-900">알림 설정</p>

        <button
          type="button"
          onClick={() => setIsNotiOn(!isNotiOn)}
          className="h-[20px] w-[37px] cursor-pointer">
          <img
            src={isNotiOn ? onIcon : offIcon}
            alt={isNotiOn ? '알림 켜짐' : '알림 꺼짐'}
            className="h-full w-full cursor-pointer object-contain"/>
        </button>
      </div>
      <button
        type="button"
        onClick={onLogoutClick}
        className=" flex w-full mb-[29px] mt-[38px] cursor-pointer items-center justify-between text-left">
        <div className="flex flex-col gap-[4px] ">
          <p
          className="text-[16px] font-semibold text-gray-900">로그아웃</p>
        </div>
      </button>
    </div>
  );
};

export default ProfileMenu;
