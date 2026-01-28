import backIcon from '../../assets/icons/Vector.svg';
import checkIcon from '../../assets/icons/isvalid.svg'
import checkgray from '../../assets/icons/checkgray.svg'
import checkblue from '../../assets/icons/checkblue.svg'
import Button from '../../components/onboarding/Button';
import Unchecked from '../../assets/icons/unchecked.svg'
import rightarrow from '../../assets/icons/rightarrow.svg'
import { useNavigate } from 'react-router-dom';
import  { useState } from 'react';


const TermsPage = () => {
const navigate = useNavigate();
const [] = useState(checkgray);
const [active] = useState(false);
const [require1, setRequire1] = useState(false);
const [require2, setRequire2] = useState(false);
const [require3, setRequire3] = useState(false);
const handleNext = (path: string) => {
  if (active) {
    navigate(path);
  } else {
    alert("약관에 동의해 주세요.");
  }
}

const allAgreed= require1 && require2 && require3;
const handleAllClick = () => {
    const newState = !allAgreed;
    setRequire1(newState);
    setRequire2(newState);
    setRequire3(newState);
}
  
  return (
    <div className='flex flex-col w-full mt-[16px] px-4'>

      <header className="relative flex items-center justify-center w-full h-[60px]">
        <button
            onClick={() => navigate(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 ">
            <img src={backIcon} alt="뒤로가기" className="w-[8px] h-[16px]" />
        </button>
        <h1 className="text-lg font-semibold leading-none text-gray-900">
          약관 동의
        </h1>
      </header>

      <div className="text-left mt-[30px] mb-[32px]">
        <p className ="font-semibold text-[20px] leading-[26px] text-gray-900">Finly
        <br />
        <span className="font-bold text-[20px] leading-[26px] text-secondary">약관 동의</span>가 필요해요 </p>
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

        <span className="text-[17px] font-medium ">서비스 이용약관 전체 동의</span>
    </button>

    <div className="flex flex-row items-center text-left w-full mt-[30px] gap-[8px]">
        <button onClick={require1 ? () => setRequire1(false) : () => setRequire1(true)}>
        <img src={!require1 ? Unchecked : checkIcon} alt="" />
        </button>
        <p className=" text-[16px] font-medium text-gray-900"> (필수) 이용약관 동의</p>
        <img src={rightarrow} alt="오른쪽 화살표" className='ml-auto' />
    </div>

    <div className="flex flex-row items-center text-left w-full mt-[30px] gap-[8px]">
        <button onClick={require2 ? () => setRequire2(false) : () => setRequire2(true)}>
        <img src={!require2 ? Unchecked : checkIcon} alt="" />
        </button>
        <p className=" text-[16px] font-medium text-gray-900"> (필수) 개인정보 처리방침 동의</p>
        <img src={rightarrow} alt="오른쪽 화살표" className='ml-auto' />
    </div>

    <div className="flex flex-row items-center text-left w-full mt-[30px] gap-[8px]">
        <button onClick={require3 ? () => setRequire3(false) : () => setRequire3(true)}>
        <img src={!require3 ? Unchecked : checkIcon} alt="" />
        </button>
        <p className=" text-[16px] font-medium text-gray-900"> (선택) 마케팅 정보수신 동의</p>
        <img src={rightarrow} alt="오른쪽 화살표" className='ml-auto' />
    </div>

    <div className="w-full mt-[325px] mb-[52px]">
        <Button disabled={!allAgreed}
        onClick={() => { handleNext('/onboarding/persona/test'); }} >
          다음
        </Button>
    </div>
    
    
    </div>
    
    
  );
};

export default TermsPage;