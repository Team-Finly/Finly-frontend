import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@/components/auth/TextField';
import backIcon from '@/assets/icons/Vector.svg';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <div className="mt-[16px] flex w-full flex-col px-4">
      {/* 1. Header */}
      <header className="relative flex h-[60px] w-full items-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-1/2 left-0 -translate-y-1/2"
        >
          <img src={backIcon} alt="뒤로가기" className="h-[16px] w-[8px]" />
        </button>
        <h1 className="text-lg leading-none font-semibold text-gray-900">
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
            onClear={() => setEmail('')}
            placeholder="abc@email.com"
            type="email"
            isValid={isEmailInputValid && email.length > 0}
            showValidIcon={false}
          />
        </div>
        <div>
          <TextField
            label="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onClear={() => setPassword('')}
            placeholder="6자리 이상의 비밀번호"
            type="password"
            isValid={isPasswordInputValid && password.length > 0}
            showValidIcon={false}
          />
          {loginError && (
            <div className="mt-[10px] font-normal text-[#F04452]">
              이메일과 비밀번호가 일치하지 않습니다
            </div>
          )}
        </div>
      </div>

      {/* 3. 로그인 버튼 */}
      <button
        disabled={!isFormValid}
        onClick={handleLogin}
        className={`mt-[45px] h-[50px] w-full rounded-[12px] text-lg font-medium transition-colors duration-200 ${
          isFormValid
            ? 'bg-secondary cursor-pointer text-white'
            : 'cursor-not-allowed bg-gray-100 text-gray-300'
        } `}
      >
        로그인
      </button>

      {/* 4. 회원가입 링크 */}
      <div className="font-regular mt-[34px] text-center leading-[26px] text-gray-500">
        아직 계정이 없으신가요?
        <span
          onClick={() => navigate('/signup')}
          className="text-secondary ml-[10px] cursor-pointer leading-[26px] font-medium hover:underline"
        >
          회원가입하기
        </span>
      </div>
    </div>
  );
};
export default LoginPage;
