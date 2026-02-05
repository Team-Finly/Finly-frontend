import backIcon from '@/assets/icons/Vector.svg';
import checkIcon from '@/assets/icons/isvalid.svg'
import checkgray from '@/assets/icons/checkgray.svg'
import checkblue from '@/assets/icons/checkblue.svg'
import Button from '@/components/onboarding/Button';
import Unchecked from '@/assets/icons/unchecked.svg'
import rightarrow from '@/assets/icons/rightarrow.svg'
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useSignupStore } from '@/store/signupStore';
import {useTermsList} from '@/hooks/useTerms';

const TermsPage = () => {
const navigate = useNavigate();
const { data: termsData } = useTermsList();

  const { 
    agreements, 
    toggleAgreement, 
    setAllAgreements, 
    setTermAgreements 
  } = useSignupStore();

  const allAgreed = useMemo(() => {
    if (!termsData) return false;
    return termsData.every((t) => agreements[String(t.termId)]);
  }, [termsData, agreements]);

  const isNextEnabled = useMemo(() => {
    if (!termsData) return false;
    return termsData
      .filter((t) => t.required)
      .every((t) => agreements[String(t.termId)]); 
  }, [termsData, agreements]);

const handleAllClick = () => {
    setAllAgreements(!allAgreed);
  };


const handleNext = (path: string) => {
    if (isNextEnabled && termsData) {
      const formattedAgreements = termsData?.map((t) => ({
        termId: t.termId,
        agreed: agreements[String(t.termId)],
      }));

      setTermAgreements(formattedAgreements);
      navigate(path);
    } else {
      alert("필수 약관에 동의해 주세요.");
    }
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
          onClick={handleAllClick}
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

      <div className="mt-[30px] flex flex-col gap-[30px]">
        {termsData?.map((term) => {
          const idStr = String(term.termId);
          const isChecked = agreements[idStr] || false;

          return (
            <div key={term.termId} className="flex flex-row items-center w-full gap-[8px]">
              <button onClick={() => toggleAgreement(idStr)}>
                <img src={isChecked ? checkIcon : Unchecked} alt="체크 여부" />
              </button>
              
              <p onClick={() => toggleAgreement(idStr)} className="text-[16px] font-medium text-gray-900 cursor-pointer">
                <span className={term.required ? "text-secondary font-bold" : "text-gray-500"}>
                </span>
                {` ${term.title}`}
              </p>
              
              <img 
                src={rightarrow} 
                className='ml-auto cursor-pointer'
                onClick={() => navigate(`/termsdetail/${term.termId}`)} 
              />
            </div>
          );
        })}
      </div>
      <div className="w-full mt-auto mb-[52px]">
          <Button disabled={!isNextEnabled} onClick={() => { handleNext('/start'); }} >
            다음
          </Button>
      </div>
    </div>
    
    
  );
};

export default TermsPage;