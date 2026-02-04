import OptionCard from '@/components/onboarding/OptionCard';
import Button from '@/components/onboarding/Button';
import ProgressBar from '@/components/onboarding/ProgressBar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_QUESTIONS } from "@/constants/personaData";
import backIcon from "../../assets/icons/Vector.svg";
import { useSignupStore } from "../../store/signupStore";

const PersonaTestPage = () => {
const navigate = useNavigate();
const setPersonaAnswers = useSignupStore((state) => state.setPersonaAnswers);
const [step, setStep] = useState(0);
const[answers, setAnswers] = useState<Record<number, number>>({});
const currentQ = MOCK_QUESTIONS[step];

  //옵션 선택 함수 정의
  const handleSelect = (optionId: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  //다음 버튼 함수 정의
  const handleNext = () => {
    if (step < MOCK_QUESTIONS.length - 1) {
      setStep(step + 1); 
    } else {
      const formattedAnswers = Object.entries(answers).map(([qId, optId]) => ({
        questionId: Number(qId),
        optionId: optId
      }));
      console.log("최종 제출 데이터:", answers);
      
      console.log("📦 스토어에 데이터 저장 중...", formattedAnswers);
      setPersonaAnswers(formattedAnswers);

      navigate('/onboarding/personaresult');
    }
  };

  return (
    <div className="mt-[16px] flex w-full flex-col px-4">
      {/* 1. Header */}
      <header className="relative flex h-[60px] w-full items-center justify-center">
        <button
          onClick={() => {
            if (step === 0) {
              navigate('/signup', { state: { step: 'nickname' } });
            } else {
              setStep(step - 1); // 이전 질문으로 이동
            }
          }}
          className="absolute top-1/2 left-0 -translate-y-1/2"
        >
          <img
            src={backIcon}
            alt="뒤로가기"
            className="left-0 h-[16px] w-[8px]"
          />
        </button>

        <h1 className="text-lg leading-none font-semibold text-gray-900">투자 페르소나 테스트</h1>
      </header>
      <div className="flex flex-col">
        <ProgressBar current={step + 1} total={3} />
      </div>

      <div>
        {/*질문 번호*/}
        <div className="mb-[50px]">
          <span className="text-secondary mt-[30px] mb-[10px] block h-[26px] w-[32px] text-[24px] font-semibold">
            {currentQ.questionCode}
          </span>

          {/*질문 내용*/}
          <h1 className="mb-[40px] whitespace-pre-wrap">
            <span className="text-[20px] leading-[30px] font-semibold text-[#1F2023]">
              {currentQ.content}
            </span>
          </h1>

          {/*옵션*/}
          {currentQ.options.map((opt) => (
            <OptionCard
              key={opt.id}
              content={`${opt.choiceCode}. ${opt.content}`}
              isSelected={answers[currentQ.id] === opt.id}
              onClick={() => handleSelect(opt.id)}
            />
          ))}
        </div>

        {/*다음 버튼*/}
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
