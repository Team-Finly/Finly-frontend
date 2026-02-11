import OptionCard from '@/components/onboarding/OptionCard';
import Button from '@/components/onboarding/Button';
import ProgressBar from '@/components/onboarding/ProgressBar';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MOCK_QUESTIONS } from '@/constants/persona';
import backIcon from '../../assets/icons/Vector.svg';
import { useSignupStore } from '../../store/signupStore';
import { useUserStore } from '@/store/userStore';

const PersonaTestPage = () => {
const navigate = useNavigate();
const location = useLocation();
const isRetest = location.state?.from === 'mypage';
const setPersonaAnswers = useSignupStore((state) => state.setPersonaAnswers);
const [step, setStep] = useState(0);
const [answers, setAnswers] = useState<Record<number, number>>({});

const currentQ = MOCK_QUESTIONS[step];

const signupNickname = useSignupStore((state) => state.nickname);
const { nickname: userNickname, fetchMainProfile } = useUserStore();

useEffect(() => {
    if (isRetest && !userNickname) {
      fetchMainProfile(); 
    }
  }, [isRetest, userNickname, fetchMainProfile]);

  const activeNickname = isRetest ? userNickname : signupNickname;
  const fallbackNickname = activeNickname || "사용자";
  const displayContent = currentQ.content.replace('{nickname}', fallbackNickname);

  const handleSelect = (optionId: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleBack = () => {
    if (step === 0) {
      if (isRetest) {
        navigate('/mypersona'); 
      } else {
        navigate('/signup', { state: { step: 'nickname' } }); 
      }
    } else {
      setStep(step - 1);
    }
  };

  const handleNext = () => {
    if (step < MOCK_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      const formattedAnswers = Object.entries(answers).map(([qId, optId]) => ({
        questionId: Number(qId),
        optionId: optId
      }));
      setPersonaAnswers(formattedAnswers);
      navigate('/personaresult', { state: { from: isRetest ? 'mypage' : 'signup' } });
    }
  };

  return (
    <div className="mt-[16px] flex w-full flex-col px-4">
      <header className="relative flex h-[60px] w-full items-center justify-center">
        <button
          onClick={handleBack}
          className="absolute top-1/2 left-0 -translate-y-1/2 cursor-pointer"
        >
          <img
            src={backIcon}
            alt="뒤로가기"
            className="left-0 h-[16px] w-[8px]"
          />
        </button>
        <p className="text-lg leading-none font-semibold text-gray-900">투자 페르소나 테스트</p>
      </header>

      <div className="flex flex-col">
        <ProgressBar current={step + 1} total={3} />
      </div>

      <div>
        <div className="mb-[50px]">
          <span className="text-secondary mt-[30px] mb-[10px] block h-[26px] w-[32px] text-[24px] font-semibold">
            {currentQ.questionCode}
          </span>
          <p className="mb-[40px] whitespace-pre-wrap">
            <span className="text-[20px] leading-[30px] font-semibold text-[#1F2023]">
              {displayContent}
            </span>
          </p>
          {currentQ.options.map((opt) => (
            <OptionCard
              key={opt.id}
              content={`${opt.choiceCode}. ${opt.content}`}
              isSelected={answers[currentQ.id] === opt.id}
              onClick={() => handleSelect(opt.id)}
            />
          ))}
        </div>

        <div>
          <Button onClick={handleNext} disabled={!answers[currentQ.id]}>
            다음
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PersonaTestPage;
