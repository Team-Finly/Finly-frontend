import React from 'react'
import CircularScore from '../../components/mypage/CircularScore';
import profileImg from '../../assets/icons/profile.svg';
import line from '../../assets/icons/line.svg';
import { useNavigate } from 'react-router-dom';
import ProfileMenu from '../../components/mypage/ProfileMenu';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-none z-10 bg-white">
        <div className="h-4 w-full bg-white" />
        <div className="flex h-15 w-full items-center justify-between px-4 text-gray-900">
          <h1 className="text-xl font-semibold">마이</h1>
        </div>
    </div>
    <main className="flex-1 overflow-y-auto scrollbar-hide  pb-[120px]">

    <div className=' flex flex-row  justify-between items-start mt-[20px] h-[176px] rounded-[12px] border-gray-100 border-[1.2px] bg-white mx-[16px] pr-[26px] pl-[16px] pt-[24px]'>
      
      <div className='flex flex-row items-center gap-4 mt-[8px] flex-shrink-0'>

          <div className='w-[60px] h-[60px] flex-shrink-0'>
            <img src={profileImg} alt="Profile" className='w-full h-full object-cover'/>
          </div>
          <div className='flex flex-col whitespace-nowrap'>
            <p className='font-medium text-[12px] text-gray-700 mb-1'>신중한 거북이</p>
            <p className='font-semibold text-[18px] text-gray-900'>조아님</p>
          </div>
          </div>
      <div className='flex flex-row items-start gap-[34px]'>
          <img src={line} alt="Line" className="mt-[10px] flex-shrink-0"/>
      <div className='flex flex-col items-center flex-shrink-0 w-fit'>
        <p className='mb-[12px] font-semibold text-[14px] text-gray-900 whitespace-nowrap'>금융 마음 지수</p>
        <CircularScore 
            score={64}        //원 안에 들어갈 점수
            color="#FFF34A"    //원 테두리 색상
            size={80}  //원 테두리 두께
            />
            <p className='mt-[8px] text-center font-semibold text-[12px] text-gray-300 whitespace-nowrap'>평균적 대응</p>
      </div>
      </div>
    </div>

    <div >
      <div className='flex flex-row bg-[#E9F0FA99] rounded-[12px] h-[78px] px-[12px] mt-[20px] mx-[16px] border-gray-100 border-[1.2px]'>
        <div className='flex flex-col w-full mt-[20px] justify-start gap-[4px]'>
          <p className='font-bold text-[17px] text-secondary'>124개<span className='font-semibold text-[17px] text-gray-900'>의 조각</span></p>
          <p className= 'font-semibold text-[12px] text-gray-300'>나의 감정 기록 확인하기</p>
        </div>

        <div className='justify-center items-center mt-[6px]'>
          <button 
            type="button"
            onClick={() => navigate('/fragment')} 
            className='bg-white h-[26px] w-[71px] rounded-[6px] px-[8px] py-[6px] mt-[20px] whitespace-nowrap'
            >
            <p className='font-semibold text-[12px] text-gray-700'>모음함 열기</p>
          </button>
        </div>

      </div>

      <div className='mb-[39px]'>
          <ProfileMenu>

          </ProfileMenu>
        </div>
    </div>
    </main>

  
    

  </div>
    
  
  

      

    
  )
}

export default Profile
