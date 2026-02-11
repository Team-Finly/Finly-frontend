import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TextField from '@/components/auth/TextField';
import backIcon from '@/assets/icons/Vector.svg';
import { useSignupStore } from '@/store/signupStore';
import { authApi } from '../../apis/authApi';

const REGEX = {
  EMAIL: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  PASSWORD: /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/,
  NICKNAME: /^[a-zA-Z0-9가-힣]+$/,
};

type Step = "email" | "password" | "nickname";

const SignupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, setEmail, password, setPassword, nickname, setNickname } = useSignupStore();

  const VALID_STEPS: Step[] = ["email", "password", "nickname"];
  const rawStep = location.state?.step;
  const initialStep: Step = VALID_STEPS.includes(rawStep) ? rawStep : "email";
  const [step, setStep] = useState<Step>(initialStep);
 
  const [pwConfirm, setPwConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 이메일 서버 체크 상태
  const [emailChecked, setEmailChecked] = useState<"idle" | "ok" | "taken" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const isEmailFormatValid = REGEX.EMAIL.test(email);
  const isPwValid = REGEX.PASSWORD.test(password);
  const isMatch = pwConfirm.length > 0 && password === pwConfirm;
  const isNicknameValid = (name: string) => REGEX.NICKNAME.test(name) && name.length >= 2;

  const emailIsValidForUI =
    email.length === 0
      ? undefined
      : !isEmailFormatValid
        ? false
        : emailChecked === "taken" || emailChecked === "error"
          ? false
          : true;
  const emailHelperText =
    email.length === 0
      ? ""
      : !isEmailFormatValid
        ? "유효한 이메일을 입력해 주세요."
        : emailChecked === "taken"
          ? "이미 가입된 이메일입니다."
          : emailChecked === "error"
            ? "이메일 확인 중 오류가 발생했어요."
            : serverError
              ? serverError
              : "";
 const handleEmailNext = async () => {
    if (!isEmailFormatValid) return;

    setIsLoading(true);
    setServerError("");

    try {
      const res= await authApi.checkEmail(email);
      if (res.result && res.result.available === false) {
        setEmailChecked("taken");
        return;
      }
      setEmailChecked("ok");
      setStep("password")
      await authApi.checkEmail(email);

      setEmailChecked("ok");
      setStep("password");

    } catch (e: any) {
      if (e.response && e.response.status === 409) {
        setEmailChecked("taken");
      } else {
        setEmailChecked("error");
        setServerError("서버와 통신 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    } finally {
      setIsLoading(false);
    }
 };

  const handlePasswordNext = () => {
    if (!isPwValid || !isMatch) return;
    setStep("nickname");
  };

  const handleNicknameNext = () => {
    if (!isNicknameValid(nickname)) return;
    navigate("/persona"); 
  };

  return (
    <div className="mt-[16px] flex h-dvh w-full flex-col px-4">
      {/* 헤더 */}
      <header className="relative flex h-[60px] w-full items-center justify-center">
        <button
          onClick={() => {
            if (step === "email") {
              navigate('/onboarding'); 
            } else if (step === "password") {
              setStep("email");
            } else if (step === "nickname") {
              setStep("password");
            }
          }}
          className="absolute top-1/2 left-0 -translate-y-1/2 cursor-pointer"
        >
          <img src={backIcon} alt="뒤로가기" className="h-[16px] w-[8px]" />
        </button>
        <h1 className="text-[18px] leading-none font-semibold text-gray-900">
          회원가입
        </h1>
      </header>

      <div className="mt-[30px] flex flex-1 flex-col">
        {/* === 이메일 페이지 === */}
        {step === 'email' && (
          <>
            <h2 className="text-xl leading-[26px] font-semibold">
              로그인에 사용할
              <br />
              <span className="text-secondary font-semibold">이메일</span>을
              입력해 주세요
            </h2>
            <TextField
              label=""
              placeholder="finly@finly.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailChecked("idle"); 
                setServerError("");
              }}
              onClear={() => { setEmail("");
                setEmailChecked("idle");
                setServerError("");}}
              isValid={emailIsValidForUI}
              helperText={emailHelperText}
            />
          </>
        )}

        {/* === 비밀번호 입력 페이지 === */}
        {step === 'password' && (
          <>
            <h2 className="mb-[41px] text-xl leading-[26px] font-semibold">
              로그인에 사용할
              <br />
              <span className="text-secondary font-semibold">비밀번호</span>를
              입력해 주세요
            </h2>
            <div className="flex min-h-[148px] flex-col gap-[24px]">
              <TextField
                label="비밀번호 입력"
                type="password"
                placeholder="6자리 이상의 비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onClear={() => setPassword('')}
                isValid={password.length > 0 ? isPwValid : undefined}
                helperText={
                  password.length > 0 && !isPwValid
                    ? '영문 + 숫자 포함 6자리 이상 입력해주세요'
                    : ''
                }
              />
            </div>
            <div>
              <TextField
                label="비밀번호 확인"
                type="password"
                placeholder="비밀번호 재입력"
                value={pwConfirm}
                onChange={(e) => setPwConfirm(e.target.value)}
                onClear={() => setPwConfirm('')}
                isValid={
                  pwConfirm.length > 0 ? isPwValid && isMatch : undefined
                }
                //helptext 디자인 추가되면 넣기
              />
            </div>
          </>
        )}

        {/* === 닉네임 입력 페이지 === */}
        {step === 'nickname' && (
          <>
            <h2 className="text-xl leading-[26px] font-semibold">
              사용할{' '}
              <span className="text-secondary font-semibold">닉네임</span>을
              입력해 주세요
            </h2>
            <p className="mt-[12px] mb-[30px] text-[13px] font-medium text-gray-500">
              추후에 언제든지 변경할 수 있어요
            </p>
            <TextField
              label=""
              placeholder="2자 이상 입력"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              onClear={() => setNickname('')}
              isValid={
                nickname.length > 0 ? isNicknameValid(nickname) : undefined
              }
              helperText={
                nickname.length > 0 && !REGEX.NICKNAME.test(nickname)
                  ? '특수문자는 사용할 수 없어요'
                  : nickname.length > 0 && nickname.length < 2
                    ? '최소 2자 이상 입력해 주세요'
                    : undefined
              }
            />
          </>
        )}
      </div>
      {/* 버튼 영역 */}
      <div className="mb-[52px] w-full">
        {step === 'email' && (
          <button
            disabled={!isEmailFormatValid || isLoading}
            onClick={handleEmailNext}
            className={`w-full h-[50px] rounded-[12px] font-medium text-lg text-white transition-colors cursor-pointer
              ${isEmailFormatValid && !isLoading ? "bg-secondary" : "bg-gray-200 text-gray-400 cursor-not-allowed"}
            `}
          >
            {isLoading ? "확인 중..." : "다음"}
          </button>
        )}
        {step === 'password' && (
          <button
            disabled={!isPwValid || !isMatch}
            onClick={handlePasswordNext}
            className={`w-full h-[50px] rounded-[12px] font-medium text-lg text-white transition-colors cursor-pointer
              ${isPwValid && isMatch ? "bg-secondary" : "bg-gray-200 text-gray-400 cursor-not-allowed"}
            `}
          >
            다음
          </button>
        )}
        {step === 'nickname' && (
          <button
            disabled={!isNicknameValid(nickname)}
            onClick={handleNicknameNext}
            className={`w-full h-[50px] rounded-[12px] font-medium text-lg text-white transition-colors cursor-pointer
              ${isNicknameValid(nickname) ? "bg-secondary" : "bg-gray-200 text-gray-400 cursor-not-allowed"}
            `}
          >
            다음
          </button>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
