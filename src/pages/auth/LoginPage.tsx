import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@/components/auth/TextField';
import backIcon from '@/assets/icons/Vector.svg';
import { authService } from '@/services/authService';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 이메일 유효성 검사 함수
  const isEmailValid = (email: string) => {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  };
  const isEmailInputValid = isEmailValid(email);
  const isPasswordInputValid = password.length >= 6;
  const isFormValid = isEmailInputValid && isPasswordInputValid;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsLoading(true);
    setLoginError(false);

    try {
      // 1. API 호출
      const res = await authService.login({ email, password });

      if (res.isSuccess) {
        // 2. 토큰 저장
        alert(`${res.result.member.nickname}님, 환영합니다!`);
        navigate('/');
      }
    } catch (error: any) {
      console.error('❌ 로그인 실패:', error);

      setLoginError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-[16px] flex w-full flex-col px-4">
      {/* 1. Header */}
      <header className="relative flex h-[60px] w-full items-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-1/2 left-0 -translate-y-1/2 cursor-pointer"
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
            <div className="font-regular absolute mt-[10px] text-[16px] text-[#F04452]">
              이메일과 비밀번호가 일치하지 않습니다
            </div>
          )}
        </div>
      </div>

      {/* 3. 로그인 버튼 */}
      <button
        disabled={!isFormValid}
        onClick={handleLogin}
        className={`mt-[71px] h-[50px] w-full cursor-pointer rounded-[12px] text-lg font-medium transition-colors duration-200 ${
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
