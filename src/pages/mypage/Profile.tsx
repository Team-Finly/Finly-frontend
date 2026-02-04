import React from 'react';
import CircularScore from '@/components/mypage/CircularScore';
import profileImg from '@/assets/icons/profile.svg';
import line from '@/assets/icons/line.svg';
import { useNavigate } from 'react-router-dom';
import ProfileMenu from '@/components/mypage/ProfileMenu';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col bg-gray-50">
      <div className="z-10 flex-none bg-white">
        <div className="h-4 w-full bg-white" />
        <div className="flex h-15 w-full items-center justify-between px-4 text-gray-900">
          <h1 className="text-xl font-semibold">마이</h1>
        </div>
      </div>

      <main className="scrollbar-hide flex-1 overflow-y-auto pb-[120px]">
        <div className="mx-[16px] mt-[20px] flex h-[176px] flex-row items-start justify-between rounded-[12px] border-[1.2px] border-gray-100 bg-white pt-[24px] pr-[26px] pl-[16px]">
          
          <div className="mt-[8px] flex flex-shrink-0 flex-row items-center gap-4">
            <div className="h-[60px] w-[60px] flex-shrink-0">
              <img
                src={profileImg}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <p className="mb-1 text-[12px] font-medium text-gray-700">신중한 거북이</p>
              <p className="text-[18px] font-semibold text-gray-900">조아님</p>
            </div>
          </div>

          <div className="flex flex-row items-start gap-[34px]">
            <img src={line} alt="Line" className="mt-[10px] flex-shrink-0" />
            <div className="flex w-fit flex-shrink-0 flex-col items-center">
              <p className="mb-[12px] text-[14px] font-semibold whitespace-nowrap text-gray-900">금융 마음 지수</p>
              <CircularScore
                score={64} //원 안에 들어갈 점수
                color="#FFF34A" //원 테두리 색상
                size={80} //원 테두리 두께
              />
              <p className="mt-[8px] text-center text-[12px] font-semibold whitespace-nowrap text-gray-300">평균적 대응</p>
            </div>
          </div>
        </div>

        <div>

          <div className="mx-[16px] mt-[20px] flex h-[78px] flex-row rounded-[12px] border-[1.2px] border-gray-100 bg-[#E9F0FA99] px-[12px]">
            <div className="mt-[20px] flex w-full flex-col justify-start gap-[4px]">
              <p className="text-secondary text-[17px] font-bold">124개<span className="text-[17px] font-semibold text-gray-900">의 조각</span></p>
              <p className="text-[12px] font-semibold text-gray-300">나의 감정 기록 확인하기</p>
            </div>

            <div className="mt-[6px] items-center justify-center">
              <button
                type="button"
                onClick={() => navigate('/fragment')}
                className="mt-[20px] h-[26px] w-[71px] cursor-pointer rounded-[6px] bg-white px-[8px] py-[6px] whitespace-nowrap">
                <p className="text-[12px] font-semibold text-gray-700">모음함 열기</p>
              </button>
            </div>

          </div>
          <div className="mb-[39px]">
            <ProfileMenu></ProfileMenu>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Profile;
