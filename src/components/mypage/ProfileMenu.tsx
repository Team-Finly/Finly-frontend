import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import rightarrow from '../../assets/icons/rightarrow.svg'
import onIcon from '../../assets/icons/on.svg';
import offIcon from '../../assets/icons/off.svg';

const ProfileMenu = () => {
  const navigate = useNavigate();
  const [isNotiOn, setIsNotiOn] = useState(true);

  return (
    <div className="flex flex-col bg-white rounded-[12px] border-gray-100 border-[1.2px] mx-[16px] mt-[26px] px-[20px] py-[24px]">
      
      <button 
        type="button"
        onClick={() => navigate('/report-archive')} //임시주소
        className="flex items-center justify-between w-full text-left mb-[24px]"
      >
        <div className="flex flex-col gap-[4px]">
          <p className="text-[16px] font-semibold text-gray-900">AI 리포트 보관함</p>
          <p className="text-[12px] text-gray-300">주간 월간 리포트 모아보기</p>
        </div>
        <img src={rightarrow} alt="Right Arrow" />
      </button>

      
      <button 
        type="button"
        onClick={() => navigate('/persona-lab')} //임시주소
        className="flex items-center justify-between w-full text-left mb-[33px]"
      >
        <div className="flex flex-col gap-[4px]">
          <p className="text-[16px] font-semibold text-gray-900">페르소나 연구소</p>
          <p className="text-[12px] text-gray-300">테스트 다시하기 | 성향 분석</p>
        </div>
        <img src={rightarrow} alt="Right Arrow" />
      </button>

      
      <button
        type="button"
        onClick={() => navigate('/settings')} //임시주소
        className="flex items-center justify-between w-full text-left mb-[42px]"
      >
        <div className="flex flex-col gap-[4px]">
          <p className="text-[16px] font-semibold text-gray-900">프로필 및 계정 설정</p>
        </div>
        <img src={rightarrow} alt="Right Arrow" />
      </button>

      
      <div className="flex items-center justify-between w-full pt-[4px]">
         <p className="text-[16px] font-semibold text-gray-900">알림 설정</p>
         
         <button 
           type="button"
           onClick={() => setIsNotiOn(!isNotiOn)}
           className="w-[37px] h-[20px]" 
         >
           
           <img 
             src={isNotiOn ? onIcon : offIcon} 
             alt={isNotiOn ? "알림 켜짐" : "알림 꺼짐"} 
             className="w-full h-full object-contain" 
           />
         </button>
      </div>

    </div>
  );
};

export default ProfileMenu;