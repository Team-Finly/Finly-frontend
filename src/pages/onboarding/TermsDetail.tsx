import { useParams, useNavigate } from 'react-router-dom';
import backIcon from '@/assets/icons/Vector.svg';
import line from '@/assets/icons/line50.svg';
import { useSignupStore } from '@/store/signupStore';
import checkblue from '@/assets/icons/isvalid.svg';
import checkgray from '@/assets/icons/unchecked.svg';
import { useTermDetail } from '@/hooks/useTermsDetail';
import TermContentRenderer from '@/components/auth/TermContentRenderer';

const TermsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { agreements, toggleAgreement } = useSignupStore();
  const { termDetail, isLoading } = useTermDetail(id);

  const handleAgreeClick = () => {
    if (id) toggleAgreement(id);
  };

  if (isLoading)
    return (
      <div className="flex h-dvh items-center justify-center">로딩 중...</div>
    );
  if (!termDetail)
    return (
      <div className="flex h-dvh items-center justify-center">데이터 없음</div>
    );

  const term = termDetail;
  const isAgreed = agreements[id as string] || false;

  return (
    <div className="flex h-dvh w-full flex-col">
      <div className="fixed top-0 w-full max-w-120 bg-white px-4 pt-4">
        <header className="relative flex h-[60px] w-full flex-shrink-0 items-center justify-center">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 cursor-pointer"
          >
            <img src={backIcon} alt="뒤로가기" className="h-[16px] w-[8px]" />
          </button>
          <p className="text-[18px] leading-none font-semibold text-gray-900">
            약관 상세
          </p>
        </header>
      </div>
      <div className="mt-[76px] px-4">
        <p className="mt-[30px] mb-[20px] text-[20px] leading-[26px] font-semibold text-gray-900">
          {term.title}
        </p>
        <img src={line} alt="" className="mb-[6px] w-full" />
        <div className="mb-[24px]">
          <TermContentRenderer content={term.content ?? ""} />
        </div>
      </div>
      <div className="mt-[60px] mb-[60px] px-4">
        <button
          onClick={handleAgreeClick}
          className="mb-15 flex w-full cursor-pointer items-center gap-2"
        >
          <img
            src={isAgreed ? checkblue : checkgray}
            alt="동의 체크박스"
            className="h-[19.6px] w-[19.6px]"
          />
          <span className="text-[16px] text-gray-900">동의합니다</span>
        </button>
      </div>
    </div>
  );
};

export default TermsDetail;
