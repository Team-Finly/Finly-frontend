import backIcon from '../../assets/icons/Vector.svg';
import checkIcon from '../../assets/icons/isvalid.svg'
import checkgray from '../../assets/icons/checkgray.svg'
import checkblue from '../../assets/icons/checkblue.svg'
import Button from '../../components/onboarding/Button';
import Unchecked from '../../assets/icons/unchecked.svg'
import rightarrow from '../../assets/icons/rightarrow.svg'
import { useNavigate } from 'react-router-dom';
import  { useState } from 'react';
import { useEffect } from 'react';

const TermsPage = () => {
const navigate = useNavigate();
const [allAgreed, setAllAgreed] = useState(false);
const [require1, setRequire1] = useState(false);
const [require2, setRequire2] = useState(false);
const [require3, setRequire3] = useState(false);

useEffect(() => {
  if (require1 && require2 && require3) {
    setAllAgreed(true);
  } else {
    setAllAgreed(false);
  }
}, [require1, require2, require3]);

const handleNext = (path: string) => {
  if (allAgreed) {
    navigate(path);
  } else {
    alert("약관에 동의해 주세요.");
  }
}


const handleAllClick = () => {
    const newState = !allAgreed;
    setRequire1(newState);
    setRequire2(newState);
    setRequire3(newState);
};
const handleRequire1 = () => {
  setRequire1(prev => {
    return !prev;
  });
};
const handleRequire2 = () => {
  setRequire2(prev => {
    return !prev;
  });
};
const handleRequire3 = () => {
  setRequire3(prev => {
    return !prev;
  });
};
  
  return (
    <div className='flex flex-col w-full mt-[16px] px-4 h-dvh'>

      <header className="relative flex items-center justify-center w-full h-[60px]">
        <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 ">
            <img src={backIcon} alt="뒤로가기" className="w-[8px] h-[16px]" />
        </button>
        <h1 className="text-lg font-semibold leading-none text-gray-900">
          약관 동의
        </h1>
      </header>

      <div className="text-left mt-[30px] mb-[32px]">
        <p className ="font-semibold text-[20px] leading-[26px] text-gray-900">Finly
        <br />
        <span className="font-semibold text-[20px] leading-[26px] text-secondary">약관 동의</span>가 필요해요 </p>
      </div>
    
    <button 
        onClick={() => handleAllClick()}
        className={`justify-center border-[1.2px] rounded-[12px] w-full h-[50px] px-4 border-gray-300 flex items-center gap-[10px]
        ${allAgreed
        ? 'border-secondary bg-blue-bg/80 text-secondary'
        : 'border-gray-300 bg-white text-gray-300'
        }`}
        >

        <img src={allAgreed ? checkblue : checkgray}
         alt="체크 아이콘"
         className="w-[15px] h-[12px]" />

        <span className="text-[17px] font-semibold ">서비스 이용약관 전체 동의</span>
    </button>

    <div className="flex flex-row items-center text-left w-full mt-[30px] gap-[8px]">
        <button onClick={handleRequire1}>
        <img src={!require1 ? Unchecked : checkIcon} alt="" />
        </button>
        <p className=" text-[16px] font-medium text-gray-900"> (필수) 이용약관 동의</p>
        <img src={rightarrow} alt="오른쪽 화살표" className='ml-auto' />
    </div>

    <div className="flex flex-row items-center text-left w-full mt-[30px] gap-[8px]">
        <button onClick={handleRequire2}>
        <img src={!require2 ? Unchecked : checkIcon} alt="" />
        </button>
        <p className=" text-[16px] font-medium text-gray-900"> (필수) 개인정보 처리방침 동의</p>
        <img src={rightarrow} alt="오른쪽 화살표" className='ml-auto' />
    </div>

    <div className="flex flex-row items-center text-left w-full mt-[30px] gap-[8px]">
        <button onClick={handleRequire3}>
        <img src={!require3 ? Unchecked : checkIcon} alt="" />
        </button>
        <p className=" text-[16px] font-medium text-gray-900"> (선택) 마케팅 정보수신 동의</p>
        <img src={rightarrow} alt="오른쪽 화살표" className='ml-auto' />
    </div>

    <div className="w-full mt-auto mb-[52px]">
        <Button disabled={!(require1 && require2)}
        onClick={() => { handleNext('/onboarding/personaresult'); }} >
          다음
        </Button>
    </div>
    
    
    </div>
    
    
  );
};

export default TermsPage;