import backIcon from '@/assets/icons/Vector.svg';
import checkIcon from '@/assets/icons/isvalid.svg';
import checkgray from '@/assets/icons/checkgray.svg';
import checkblue from '@/assets/icons/checkblue.svg';
import Button from '@/components/onboarding/Button';
import Unchecked from '@/assets/icons/unchecked.svg';
import Next from '@/assets/icons/next.svg';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useSignupStore } from '@/store/signupStore';
import { useTermsList } from '@/hooks/useTerms';

const TermsPage = () => {
  const navigate = useNavigate();
  const { data: termsData } = useTermsList();

  const { agreements, toggleAgreement, setAllAgreements, setTermAgreements } =
    useSignupStore();

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
    const allIds = termsData?.map((t) => String(t.termId));
    setAllAgreements(!allAgreed, allIds);
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
      alert('필수 약관에 동의해 주세요.');
    }
  };

  return (
    <div className="mt-[16px] flex h-dvh w-full flex-col px-4">
      <header className="relative flex h-[60px] w-full items-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-1/2 left-0 -translate-y-1/2"
        >
          <img
            src={backIcon}
            alt="뒤로가기"
            className="h-[16px] w-[8px] cursor-pointer"
          />
        </button>
        <h1 className="text-lg leading-none font-semibold text-gray-900">
          약관 동의
        </h1>
      </header>

      <div className="mt-[30px] mb-[32px] text-left">
        <p className="text-[20px] leading-[26px] font-semibold text-gray-900">
          Finly
          <br />
          <span className="text-secondary text-[20px] leading-[26px] font-semibold">
            약관 동의
          </span>
          가 필요해요
        </p>
      </div>

      <button
        onClick={handleAllClick}
        className={`flex h-[50px] w-full cursor-pointer items-center justify-center gap-[10px] rounded-[12px] border-[1.2px] border-gray-300 px-4
          ${allAgreed
            ? 'border-secondary bg-blue-bg/80 text-secondary'
            : 'border-gray-300 bg-white text-gray-300'
        }`}
      >
        <img
          src={allAgreed ? checkblue : checkgray}
          alt="체크 아이콘"
          className="h-[12px] w-[15px]"
        />
        <span className="text-[17px] font-semibold">
          서비스 이용약관 전체 동의
        </span>
      </button>

      <div className="mt-[30px] flex flex-col gap-[30px]">
        {termsData?.map((term) => {
          const idStr = String(term.termId);
          const isChecked = agreements[idStr] || false;

          return (
            <div
              key={term.termId}
              className="flex w-full flex-row items-center gap-[8px]"
            >
              <button
                onClick={() => toggleAgreement(idStr)}
                className="cursor-pointer"
                aria-label="약관 동의 체크박스"
              >
                <img src={isChecked ? checkIcon : Unchecked} alt="체크 여부" />
              </button>
              <button
                onClick={() => toggleAgreement(idStr)}
                className="cursor-pointer text-[16px] font-medium text-gray-900"
              >
                {term.title}
              </button>
              <button
                type="button"
                className="ml-auto cursor-pointer"
                onClick={() => navigate(`/termsdetail/${term.termId}`)}
                aria-label="약관 상세보기"
              >
                <img src={Next} alt="약관 상세보기 아이콘" aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
      <div className="mt-auto mb-[52px] w-full">
        <Button
          disabled={!isNextEnabled}
          onClick={() => {
            handleNext('/start');
          }}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default TermsPage;
