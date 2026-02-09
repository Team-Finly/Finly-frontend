import TextField from "@/components/auth/TextField";
import { usePasswordChange } from "@/hooks/usePasswordChange";
import Header from "@/components/record/TitleHeader";
const PasswordChange = () => {
  const { state, actions } = usePasswordChange();

  return (
    <div className="min-h-screen">
      <Header title="비밀번호 변경" />

      <div className="flex flex-col mt-[80px] flex-1 px-4">

        <div className="flex flex-col mt-[80px]">
          <TextField
            label="변경 비밀번호 입력"
            type="password"
            placeholder="6자리 이상의 비밀번호"
            value={state.password}
            onChange={(e) => actions.setPassword(e.target.value)}
            onClear={() => actions.setPassword('')}
            isValid={state.password.length > 0 ? state.isPwValid : undefined}
            helperText={
              state.password.length > 0 && !state.isPwValid
                ? '영문 + 숫자 포함 6자리 이상 입력해주세요'
                : ''
            }
          />
          
          <div className="mt-[46px]">
            <TextField
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호 재입력"
            value={state.pwConfirm}
            onChange={(e) => actions.setPwConfirm(e.target.value)}
            onClear={() => actions.setPwConfirm('')}
            isValid={
              state.pwConfirm.length > 0 
                ? (state.isPwValid && state.isMatch) 
                : undefined
            }
          />
          </div>
        </div>

        <div className="mt-[356px] mb-[52px] w-full">
        <button
          onClick={actions.handleSubmit}
          disabled={!state.isValid}
          className={`w-full h-[52px] rounded-[12px] text-[16px] font-semibold transition-colors
            ${state.isValid 
              ? "bg-secondary text-white cursor-pointer" 
              : "bg-gray-100 text-gray-300 cursor-not-allowed"
            }`}
        >
          완료
        </button>
      </div>
      </div>
    </div>
  );
};

export default PasswordChange;