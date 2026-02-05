import { useNavigate } from 'react-router-dom';
import ProfileMenu from '@/components/mypage/ProfileMenu';
import ProfileCard from '@/components/mypage/ProfileCard';
import MindscoreCard from '@/components/mypage/MindscoreCard';

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

      <main className="scrollbar-hide flex-1 overflow-y-auto pb-[120px] ">
        <div className='flex w-full px-4 gap-4 mt-[20px] mb-[16px]'>
          <ProfileCard></ProfileCard>
          <MindscoreCard score={64} color="#FFF34A"></MindscoreCard>
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
