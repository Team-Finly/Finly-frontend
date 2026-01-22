import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import TextField from "../../components/auth/TextField";
import backIcon from "../../assets/icons/Vector.svg";

const SignupPage = () => {
  const navigate = useNavigate();
  
  // 상태 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  
  // 단계 관리 (이메일 입력 후 -> 비밀번호 입력)
  const [step, setStep] = useState<"email" | "password" | "nickname">("email");

  //이메일 검사 로직
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const isEmailFormatValid = emailRegex.test(email);
  
  //이미 가입된 이메일인지 확인하는 변수 (테스트)
  const isEmailTaken = email === "finly@finly.com"; 

  // TextField에 넘겨줄 상태
  // 중복이거나 형식이 틀리면 false, 아니면 true
  const emailStatus = isEmailTaken ? false : isEmailFormatValid; 
  
  // 이메일 에러 메시지
  let emailHelperText = "";
  if (isEmailTaken) emailHelperText = "이미 가입된 회원입니다. 로그인 해주세요.";
  else if (!isEmailFormatValid) emailHelperText = "유효한 이메일을 입력해 주세요.";

  // 비밀번호 검사 로직
  const isPwValid = password.length >= 6;
  const isMatch = pwConfirm.length > 0 && password === pwConfirm;

  const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,}$/;
  const isNicknameValid = nicknameRegex.test(nickname);
  


  return (
    <div className='flex flex-col w-full h-dvh mt-[16px] px-4'>
      {/* 헤더 */}
      <header className="relative flex items-center justify-center w-full h-[60px]">
        <button
          onClick={() => {
            if (step === "email") {
              navigate(-1); // 임시로 이전 페이지로 이동
            } else if (step === "password") {
              setStep("email");
            } else if (step === "nickname") {
              setStep("password");
            }
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2"
        >
          <img src={backIcon} alt="뒤로가기" className="w-[8px] h-[16px]" />
        </button>
        <h1 className="text-[18px] leading-none font-semibold text-gray-900">회원가입</h1>
      </header>

      
      <div className="flex flex-col flex-1  mt-[30px]">
        {/* === 이메일 페이지 === */}
        {step === "email" && (
          <>
            <h2 className="text-xl font-semibold leading-[26px]">로그인에 사용할<br/><span className="text-secondary font-semibold">이메일</span>을 입력해 주세요</h2>
            <TextField 
              label=""
              placeholder="finly@finly.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onClear={() => setEmail("")}
              isValid={email.length > 0 ? emailStatus : undefined}
              helperText={
                email.length > 0
                  ? isEmailTaken
                    ? "이미 가입된 이메일입니다.
                    : !isEmailFormatValid
                      ? "유효한 이메일을 입력해 주세요."
                      : ""
                  : ""
              }
            />
          </>
        )}

        {/* === 비밀번호 입력 페이지 === */}
        {step === "password" && (
          <>
            <h2 className="text-xl font-semibold leading-[26px] mb-[41px]">로그인에 사용할<br/><span className="text-secondary font-semibold">비밀번호</span>를 입력해 주세요</h2>
            <div className=' mb-[46px]'>
              <TextField 
              label="비밀번호 입력"
              type="password"
              placeholder="6자리 이상의 비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onClear={() => setPassword("")}
              isValid={password.length > 0 ? isPwValid : undefined}
              helperText={
                password.length < 6 && password.length > 0
                  ? "6자리 이상 입력해주세요"
                  : ""
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
              onClear={() => setPwConfirm("")}
              isValid={pwConfirm.length > 0 ? isMatch : undefined}
              //helptext 디자인 추가되면 넣기
            />
            </div>
          </>
        )}

        {/* === 닉네임 입력 페이지 === */}
        {step === "nickname" && (
          <>
            <h2 className="text-xl font-semibold leading-[26px]">사용할 <span className="text-secondary font-semibold">닉네임</span>을 입력해 주세요</h2>
            <p className="text-[13px] font-medium text-gray-500 mt-[12px] mb-[30px]">추후에 언제든지 변경할 수 있어요</p>
            <TextField
              label=""
              placeholder="2자 이상 입력"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              onClear={() => setNickname("")}
              isValid={nickname.length > 0 ? nickname.length >= 2 : undefined}
              helperText={
                /[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]/.test(nickname)
                  ? "특수문자는 들어갈 수 없어요"
                  : nickname.length > 0 && nickname.length < 2
                    ? "최소 2자 이상 입력해 주세요"
                    : undefined
            }
            />
          </>
        )}
      </div>

      {/* 버튼 영역 */}
      <div className="w-full mb-[52px]">
        {step === "email" && (
          <button
            disabled={!emailStatus || email.length === 0}
            onClick={() => setStep("password")}
            className={`w-full h-[50px] rounded-[12px] font-medium text-lg text-white transition-colors
              ${emailStatus ? "bg-secondary" : "bg-gray-200 text-gray-400 cursor-not-allowed"}
            `}
          >
            다음
          </button>
        )}
        {step === "password" && (
          <button
            disabled={!isPwValid || !isMatch}
            onClick={() => setStep("nickname")}
            className={`w-full h-[50px] rounded-[12px] font-medium text-lg text-white transition-colors
              ${isPwValid && isMatch ? "bg-secondary" : "bg-gray-200 text-gray-400 cursor-not-allowed"}
            `}
          >
            다음
          </button>
        )}
        {step === "nickname" && (
          <button
            disabled={nickname.length < 2}
            onClick={() => navigate("/onboarding/persona")}
            className={`w-full h-[50px] rounded-[12px] font-medium text-lg text-white transition-colors
              ${nickname.length >= 2 ? "bg-secondary" : "bg-gray-200 text-gray-400 cursor-not-allowed"}
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