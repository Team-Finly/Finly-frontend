import defaultprofileIcon from '@/assets/icons/profile.svg';

interface ProfileCardProps {
  nickname: string;
  profileImage: string|null;
  personaName?: string;
}
const ProfileCard = ({ nickname, profileImage, personaName }: ProfileCardProps) => {

  return (
    <div className="h-[176px] flex flex-1 flex-col items-center justify-center rounded-[12px] border border-gray-50 bg-white py-6">
            <div className="mt-[25px] mb-[12px] w-[76px] h-[76px] rounded-full flex-shrink-0 overflow-hidden border border-gray-100">
            <img
                src={profileImage || defaultprofileIcon}
                alt="Profile"
                className="object-cover w-full h-full"
              />
              </div>
            <div className="flex flex-col items-center justify-center whitespace-nowrap mb-[24px]">
              {personaName && <p className="mb-1 text-[12px] font-medium text-gray-700">{personaName}</p>}
              <p className="text-[18px] font-semibold text-gray-900">{nickname} 님</p>
            </div>
    </div>    
    );
};

export default ProfileCard;