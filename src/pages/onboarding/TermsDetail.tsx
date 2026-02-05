import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { TERMS_CONTENT } from '@/constants/terms';
import backIcon from '@/assets/icons/Vector.svg';
import line from '@/assets/icons/line50.svg';
import { useSignupStore } from '@/store/signupStore';
import checkblue from '@/assets/icons/isvalid.svg'
import checkgray from '@/assets/icons/unchecked.svg';

const TermsDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const {agreements, toggleAgreement} = useSignupStore();
    const term = TERMS_CONTENT[id as keyof typeof TERMS_CONTENT];
    const isAgreed = agreements[id as string] || false;

    const handleAgreeClick=() => {
      if (id){
        toggleAgreement(id);
      }
    }

if (!term) {return (<div>데이터없음</div>);}

  return (
    <div className='flex flex-col w-full mt-[16px] px-4 h-dvh'>
      <header className="relative flex items-center justify-center w-full h-[60px]">
          <button
              onClick={() => navigate(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 ">
              <img src={backIcon} alt="뒤로가기" className="w-[8px] h-[16px]" />
          </button>
          <p className="text-[18px] font-semibold leading-none text-gray-900">
            약관 상세
          </p>
        </header>
      
      <div className="mt-[30px] overflow-y-auto scrollbar-hide">
        <p className="text-[20px] font-semibold text-gray-900 leading-[26px] mb-[20px]">
          {term.title}
        </p>
        <img src={line} alt="" className='w-full mb-[30px]'/>

        {Array.isArray(term.content) ? (
          term.content.map((section, index) => (

            <div key={index} className="mb-[24px]">
              <p className="text-[14px] font-semibold text-gray-700 mb-[8px]">
                {section.subtitle}
              </p>
              <p className="text-[14px] leading-[20px] text-regular text-gray-600 whitespace-pre-wrap">
                {section.text}
              </p>
            </div>
          ))
        ) : (
          <p className="whitespace-pre-wrap text-gray-600">{term.content}</p>
        )}

        <div className=" mt-[60px] mb-[60px]">
        <button 
          onClick={handleAgreeClick}
          className="flex items-center gap-2 cursor-pointer w-full"
        >
          <img 
            src={isAgreed ? checkblue : checkgray} 
            alt="동의 체크박스" 
            className="w-[19.6px] h-[19.6px]" 
          />
          <span className={`text-[16px] font-medium ${isAgreed ? 'text-gray-900' : 'text-gray-500'}`}>
            동의합니다
          </span>
        </button>
      </div>
      </div>
    </div>
  );
};

export default TermsDetail;


