import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import TextField from "../../components/auth/TextField";
import backIcon from "../../assets/icons/Vector.svg";


const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [loginError, setLoginError] = useState(false); // 로그인 실패 상태

  // 이메일 유효성 검사 함수
  const isEmailValid = (email: string) => {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  };
  const isEmailInputValid = isEmailValid(email);
  const isPasswordInputValid = password.length >= 6;
  const isFormValid = isEmailInputValid && isPasswordInputValid;

  // 로그인 버튼 클릭시 실행되는 함수
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 실제 로그인 로직에서 실패 시 setLoginError(true) 호출
    // 실패 시 setLoginError(true);
    // 성공 시 setLoginError(false);

    //연동시 이부분 수정 필요
  };

  return (
    <div className='flex flex-col w-full mt-[16px] px-4'>
      
      {/* 1. Header */}
      <header className="relative flex items-center justify-center w-full h-[60px]">
     <button
      onClick={() => navigate(-1)}
      className="absolute left-2 top-1/2 -translate-y-1/2 "
    >
      <img src={backIcon} alt="뒤로가기" className="w-[8px] h-[16px]" />
    </button>
        <h1 className="text-lg font-semibold leading-none text-gray-900">
          로그인
        </h1>
      </header>

      {/* 2. 입력 폼 영역 */}
      <div className="flex flex-col gap-[26px]">
        <div className="mt-[72px]">
          <TextField 
            label="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onClear={() => setEmail("")}
            placeholder="abc@email.com"
            type="email"
            isValid={isEmailInputValid && email.length > 0}
          />
        </div>
        <div >
          <TextField 
            label="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onClear={() => setPassword("")}
            placeholder="6자리 이상의 비밀번호"
            type="password"
            isValid={isPasswordInputValid && password.length > 0}
          />
          {loginError && (
            <div className="mt-[10px]  text-[#F04452] font-normal">
              이메일과 비밀번호가 일치하지 않습니다
            </div>
          )}
        </div>
      </div>

      {/* 3. 로그인 버튼 */}
      <button
        disabled={!isFormValid}
        onClick={handleLogin}
        className={`w-full h-[50px] mt-[45px] rounded-[12px] font-medium text-lg transition-colors duration-200
          ${isFormValid
            ? "bg-secondary text-white cursor-pointer"
            : "bg-gray-100 text-gray-300 cursor-not-allowed"
          }
        `}
      >
        로그인
      </button>

      {/* 4. 회원가입 링크 */}
      <div className="mt-[34px] text-center text-gray-500 font-regular leading-[26px]">
        아직 계정이 없으신가요?
        <span
          onClick={() => navigate('/signup')}
          className="ml-[10px] font-medium text-secondary cursor-pointer hover:underline leading-[26px]"
        >
          회원가입하기
        </span>
      </div>
    </div>
  );
};
export default LoginPage;