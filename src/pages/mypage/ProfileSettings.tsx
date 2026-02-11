import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Before from '@/assets/icons/before.svg';
import defaultprofileIcon from '@/assets/icons/profile.svg';
import cameraIcon from '@/assets/icons/camera.svg';
import line from '@/assets/icons/line50.svg';
import Modal from '@/components/record/Modal';
import { useProfileSettings } from '@/hooks/useProfileSettings';
import { deleteMember } from '@/apis/userApi';
import { useUserStore } from '@/store/userStore';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { state, actions } = useProfileSettings();

  const isChanged =
    state.nickname !== state.initialNickname ||
    state.profileImage !== state.initialImage;

  const handleImageClick = () => {
    if (state.isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleBackClick = () => {
    if (state.isEditing) {
      isChanged ? actions.setIsModalOpen(true) : actions.handleCancel();
    } else {
      navigate('/profile');
    }
  };
  const handleWithdrawalConfirm = async () => {
    try {
      const response = await deleteMember();

      if (response.isSuccess) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        useUserStore.getState().clearUser();
        actions.setIsWithdrawModalOpen(false);
        navigate('/onboarding');
      } else {
        actions.setIsWithdrawModalOpen(false);
      }
    } catch (error) {
      console.error(error);
      actions.setIsWithdrawModalOpen(false);
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={(e) => {
          actions.handleFileChange(e);
          e.target.value = '';
        }}
        className="hidden cursor-pointer"
      />
      <div className="fixed top-0 z-10 w-full max-w-120 border-b border-gray-100 bg-white">
        <div className="relative mt-4 flex h-15 items-center justify-center bg-white px-4">
          <button
            className="absolute left-4 cursor-pointer"
            onClick={handleBackClick}
          >
            <img src={Before} alt="이전" className="h-4 w-2 cursor-pointer" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            {state.isEditing ? '프로필 수정' : '프로필 및 계정'}
          </h1>

          {!state.isEditing && (
            <button
              onClick={() => actions.setIsEditing(true)}
              className="text-md absolute right-4 cursor-pointer font-medium text-gray-500"
            >
              수정
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col px-[16px] pt-[75px]">
        <div className="flex flex-col items-center">
          <div className="relative mt-[49px] mb-[30px]">
            <div
              onClick={handleImageClick}
              className={`flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-100 ${state.isEditing && 'cursor-pointer'}`}
            >
              <img
                onClick={handleImageClick}
                src={state.profileImage || defaultprofileIcon}
                alt="프로필 이미지"
                className="h-full w-full object-cover"
              />
            </div>
            {state.isEditing && (
              <div
                onClick={handleImageClick}
                className="absolute right-[-4px] mt-[-27px] cursor-pointer rounded-full border-2 border-white bg-blue-500 p-1.5"
              >
                <img
                  src={cameraIcon}
                  alt="카메라 아이콘"
                  className="h-4 w-4 cursor-pointer"
                />
              </div>
            )}
            {state.isEditing && state.profileImage !== defaultprofileIcon && (
              <p
                onClick={actions.handleResetImage}
                className="absolute top-[100%] mt-[12px] cursor-pointer text-[12px] text-gray-300 underline underline-offset-2"
              >
                기본 프로필로 변경
              </p>
            )}
          </div>

          <div className="flex w-full flex-col">
            <div className="relative mb-[40px] w-full">
              <label className="mb-2 block text-[14px] font-semibold text-gray-500">
                닉네임
              </label>
              <input
                type="text"
                value={state.nickname || ''}
                onChange={(e) => actions.handleNicknameChange(e.target.value)}
                readOnly={!state.isEditing}
                className={`text-medium w-full rounded-[12px] border-[1.2px] border-gray-50 bg-[#F4F5F7]/60 p-4 text-[17px] text-gray-700 outline-none ${
                  state.isEditing
                    ? state.errorMessage
                      ? 'border-stock-buy bg-white text-gray-900' // [1] 에러 발생 시
                      : 'focus:border-secondary border-gray-300 bg-white text-gray-900' // [2] 정상
                    : 'border-gray-100 bg-[#F4F5F7]/60 text-gray-700' // [3] 조회
                }`}
              />
              {state.isEditing && state.errorMessage && (
                <p className="absolute top-full left-1 mt-2 text-[12px] font-medium text-[#FF3B30]">
                  {state.errorMessage}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-[14px] font-semibold text-gray-500">
                이메일
              </label>
              <input
                type="text"
                value={state.email || ''}
                readOnly
                className="text-medium w-full rounded-[12px] border-[1.2px] border-gray-50 bg-[#F4F5F7]/60 p-4 text-[17px] text-gray-700 outline-none"
              />
            </div>
          </div>
        </div>
        <div className="flex-1" />
        <div className="flex-1">
          <div className="w-full">
            {!state.isEditing && (
              <img src={line} alt="구분선" className="mb-[30px] w-full" />
            )}
            <div className={`w-full`}>
              {state.isEditing ? (
                <button
                  onClick={actions.handleComplete}
                  disabled={!!state.errorMessage || !isChanged}
                  className="bg-secondary w-full rounded-[12px] py-4 font-semibold text-white disabled:bg-gray-100 disabled:text-gray-300"
                >
                  완료
                </button>
              ) : (
                <div className="flex flex-col gap-[30px]">
                  <button
                    className="cursor-pointer text-left text-[14px] font-medium text-gray-500/80"
                    onClick={() => navigate('/passwordchange')}
                  >
                    비밀번호 변경
                  </button>
                  <button
                    className="text-stock-buy cursor-pointer text-left text-[14px] font-medium"
                    onClick={() => actions.setIsWithdrawModalOpen(true)}
                  >
                    서비스 탈퇴
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {state.isModalOpen && (
        <Modal
          text="수정을 취소할까요?"
          desc="작성된 내용은 저장되지 않아요"
          onClickLeft={actions.handleCancel}
          onClickRight={() => actions.setIsModalOpen(false)}
          onClose={() => actions.setIsModalOpen(false)}
        />
      )}
      {state.isWithdrawModalOpen && (
        <Modal
          text="계정을 탈퇴할까요?"
          desc={
            '삭제 시 모든 정보가 영구적으로 사라지며,\n다시 복구할 수 없습니다.'
          }
          rightBtnClassName="bg-red text-white"
          leftBtnLabel="취소"
          rightBtnLabel="탈퇴"
          onClickLeft={() => actions.setIsWithdrawModalOpen(false)}
          onClickRight={handleWithdrawalConfirm}
          onClose={() => actions.setIsWithdrawModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfileSettings;
