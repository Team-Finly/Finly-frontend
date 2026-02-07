import { useParams, useNavigate } from 'react-router-dom';
import backIcon from '@/assets/icons/Vector.svg';
import line from '@/assets/icons/line50.svg';
import { useSignupStore } from '@/store/signupStore';
import checkblue from '@/assets/icons/isvalid.svg'
import checkgray from '@/assets/icons/unchecked.svg';
import { useTermDetail } from '@/hooks/useTermsDetail';

const TermsDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { agreements, toggleAgreement } = useSignupStore();
    const { termDetail, isLoading } = useTermDetail(id);

    const handleAgreeClick = () => {
        if (id) toggleAgreement(id);
    };

    if (isLoading) return <div className="flex justify-center items-center h-dvh">로딩 중...</div>;
    if (!termDetail) return <div className="flex justify-center items-center h-dvh">데이터 없음</div>;

    const term = termDetail;
    const isAgreed = agreements[id as string] || false;
    
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
      
      <div className="flex-1 mt-[30px] overflow-y-auto scrollbar-hide">
        <p className="text-[20px] font-semibold text-gray-900 leading-[26px] mb-[20px]">
          {term.title}
        </p>
        <img src={line} alt="" className='w-full mb-[30px]'/>

        <div className="mb-[24px] whitespace-pre-line text-[14px] leading-[20px] text-regular text-gray-600">
            {term.content} 
        </div>
      </div>
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
  );
};

export default TermsDetail;


