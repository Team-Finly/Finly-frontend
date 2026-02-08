import {useRef} from "react";
import { useNavigate } from "react-router-dom";
import Before from "@/assets/icons/before.svg";
import defaultprofileIcon from "@/assets/icons/profile.svg";
import cameraIcon from "@/assets/icons/camera.svg";
import line from "@/assets/icons/line50.svg";
import Modal from "@/components/record/Modal";
import { useProfileSettings } from "@/hooks/useProfileSettings";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { state, actions } = useProfileSettings();

  const handleImageClick = () => {  
    if (state.isEditing && fileInputRef.current) {
      fileInputRef.current.click();   // 파일 선택 창 열기
    }
  };

  const handleBackClick = () => {
    if (state.isEditing) {
    const isChanged = state.nickname !== state.initialNickname || state.profileImage !== state.initialImage;
    isChanged ? actions.setIsModalOpen(true) : actions.handleCancel();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      <input
      type="file" 
      accept='image/*'     
      ref={fileInputRef}   
      onChange={(e) => {
        actions.handleFileChange(e);
        e.target.value = "";}}
      className="hidden cursor-pointer"
    />
      <div className="fixed top-0 z-10 w-full max-w-120 border-b border-gray-100 bg-white">
        <div className="relative mt-4 flex h-15 items-center justify-center bg-white px-4">
          <button
            className="absolute left-4 cursor-pointer"
            onClick={handleBackClick}>
            <img src={Before} alt="이전" className="cursor-pointer"/>
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            {state.isEditing ? "프로필 수정" : "프로필 및 계정"}
          </h1>

          {!state.isEditing && (
            <button
              onClick={() => actions.setIsEditing(true)}
              className="absolute right-4 text-md font-medium text-gray-500 cursor-pointer">
              수정
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide pt-[75px] px-[16px]">
        <div className="flex flex-col items-center min-h-full pb-[52px]">
            
          <div className="relative mb-[30px] mt-[49px]">
            <div onClick={handleImageClick} className="cursor-pointer w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
              <img onClick={handleImageClick} src={state.profileImage || defaultprofileIcon} alt="프로필 이미지" className="w-full h-full object-cover" /> 
            </div>
            {state.isEditing && (
              <div onClick={handleImageClick} className="absolute mt-[-27px] right-[-4px] bg-blue-500 p-1.5 rounded-full border-2 border-white">
                <img src={cameraIcon} alt="카메라 아이콘" className="w-4 h-4 cursor-pointer" />
              </div>
            )}
            {state.isEditing && state.profileImage !== defaultprofileIcon && (
              <p
                onClick={actions.handleResetImage}
                className="absolute top-[100%] mt-[12px] text-[12px] text-gray-300 underline underline-offset-2 cursor-pointer ">
                기본 프로필로 변경
              </p>
            )}
          </div>

          <div className="w-full">
            <div className='relative w-full mb-[40px]'>
              <label className="text-[14px] text-gray-500 mb-2 block font-semibold">닉네임</label>
              <input
                type="text"
                value={state.nickname || ""}
                onChange={(e) => actions.handleNicknameChange(e.target.value)}
                readOnly={!state.isEditing}
                className={`w-full p-4 rounded-[12px] border-[1.2px] text-[17px] text-medium border-gray-50 bg-[#F4F5F7]/60 text-gray-700 outline-none ${
                  state.isEditing
                    ? state.errorMessage
                      ? "border-stock-buy bg-white text-gray-900" // [1] 에러 발생 시
                      : "border-gray-300 bg-white text-gray-900 focus:border-secondary" // [2] 정상
                      : "border-gray-100 bg-[#F4F5F7]/60 text-gray-700" // [3] 조회
                }`}
              />
              {state.isEditing && state.errorMessage && (
                <p className="absolute top-full left-1 text-[#FF3B30] text-[12px] mt-2 font-medium">
                  {state.errorMessage}
                </p>
              )}
            </div>

            <div>
              <label className="text-[14px] text-gray-500 mb-2 block font-semibold">이메일</label>
              <input
                type="text"
                value={state.email || ""}
                readOnly
                className="w-full p-4 rounded-[12px] border-[1.2px] text-[17px] text-medium border-gray-50 bg-[#F4F5F7]/60 text-gray-700 outline-none"
              />
            </div>

          {!state.isEditing && (
            <img 
              src={line} 
              alt="구분선" 
              className="w-full mt-[203px] mb-[30px]"
                />
            )}
            <div className={`w-full`}>
              {state.isEditing ? (
                <button
                  onClick={actions.handleComplete}
                  disabled={!!state.errorMessage}
                  className="w-full py-4 bg-secondary text-white rounded-[12px] font-semibold mt-[240px]
                  disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                >
                  완료
                </button>
              ) : (
                <div className="flex flex-col gap-[30px]">
                  <button className="text-left text-[14px] font-medium text-gray-500/80 cursor-pointer"
                          onClick={() => navigate('/passwordchange')}>비밀번호 변경</button>
                  <button className="text-left text-[14px] font-medium text-stock-buy cursor-pointer"
                          onClick={() => actions.setIsWithdrawModalOpen(true)}>서비스 탈퇴</button>
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
          desc={"삭제 시 모든 정보가 영구적으로 사라지며,\n다시 복구할 수 없습니다."}
          rightBtnClassName="bg-red text-white"
          leftBtnLabel="취소"
          rightBtnLabel="탈퇴"
          onClickLeft={() => {
            actions.setIsWithdrawModalOpen(false);
          }}
          onClickRight={() => {
           console.log("탈퇴 API "); actions.setIsWithdrawModalOpen(false)}}
          onClose={() => actions.setIsWithdrawModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfileSettings;