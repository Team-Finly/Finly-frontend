import profileImg from '@/assets/icons/profile.svg';


const ProfileCard = () => {

  return (
    <div className="h-[176px] flex flex-1 flex-col items-center justify-center rounded-[12px] border border-gray-50 bg-white py-6">
            <img
                src={profileImg}
                alt="Profile"
                className="mt-[25px] mb-[12px] object-cover h-[76px] w-[76px]"
              />
            <div className="flex flex-col items-center justify-center whitespace-nowrap mb-[24px]">
              <p className="mb-1 text-[12px] font-medium text-gray-700">신중한 거북이</p>
              <p className="text-[18px] font-semibold text-gray-900">조아 님</p>
            </div>
    </div>    
    );
};

export default ProfileCard;