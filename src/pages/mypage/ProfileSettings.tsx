import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Before from "@/assets/icons/brfore.svg";
import profileIcon from "@/assets/icons/profile.svg";
import cameraIcon from "@/assets/icons/camera.svg";
import line from "@/assets/icons/line.svg";
const ProfileSettings = () => {
  const navigate = useNavigate();
  
  // 상태 관리
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState("조아");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);

    // 정규식: 한글, 영문, 숫자 외 문자(특수문자, 공백 등) 체크
    const specialCharRegex = /[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]/;

    if (value.length < 2) {
      setErrorMessage("최소 2자 이상 입력해 주세요");
    } else if (specialCharRegex.test(value)) {
      setErrorMessage("특수문자는 사용할 수 없어요");
    } else {
      setErrorMessage(""); // 에러 없음
    }
  };

  const handleComplete = () => {
    if (!errorMessage) {
      setIsEditing(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">

      <div className="fixed top-0 z-10 w-full max-w-120 border-b border-gray-100 bg-white">
        <div className="relative mt-4 flex h-15 items-center justify-center bg-white px-4">
          <button
            className="absolute left-4 cursor-pointer"
            onClick={() => (isEditing ? setIsEditing(false) : navigate(-1))}>
            <img src={Before} alt="이전" />
          </button>

          <h1 className="text-lg font-semibold text-gray-900">
            {isEditing ? "프로필 수정" : "프로필 및 계정 "}
          </h1>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="absolute right-4 text-md font-medium text-gray-500 cursor-pointer">
              수정
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide pt-24 px-[16px]">
        <div className="flex flex-col items-center min-h-full pb-10">
            
          <div className="relative mb-[56px] mt-[49px]">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
              <img src={profileIcon} alt="프로필 이미지" className="w-full h-full object-cover" /> 
            </div>
            {isEditing && (
              <div className="absolute bottom-[-4px] right-[-4px] bg-blue-500 p-1.5 rounded-full border-2 border-white">
                <img src={cameraIcon} alt="카메라 아이콘" className="w-4 h-4" />
              </div>
            )}
          </div>

          {/* 입력 폼 */}
          <div className="w-full space-y-[40px]">
            {/* 닉네임: 수정 모드일 때만 readOnly 해제 */}
            <div>
              <label className="text-[14px] text-gray-500 mb-2 block font-semibold">닉네임</label>
              <input
                type="text"
                value={nickname}
                onChange={handleNicknameChange}
                readOnly={!isEditing}
                className={`w-full p-4 rounded-[12px] border-[1.2px] text-[17px] text-rmedium border-gray-50 bg-[#F4F5F7]/60 text-gray-700 outline-none ${
                  isEditing
                    ? errorMessage
                      ? "border-stock-buy bg-white text-gray-900" // [1] 에러 발생 시
                      : "border-gray-300 bg-white text-gray-900 focus:border-secondary" // [2] 정상
                      : "border-gray-100 bg-[#F4F5F7]/60 text-gray-700" // [3] 조회
                }`}
              />
              {isEditing && errorMessage && (
                <p className="text-[#FF3B30] text-[12px] mt-2 font-medium ml-1">
                  {errorMessage}
                </p>
              )}
            </div>

            {/* 이메일: 항상 읽기 전용 */}
            <div>
              <label className="text-[14px] text-gray-500 mb-2 block font-semibold">이메일</label>
              <input
                type="text"
                value="finly@finly.com"
                readOnly
                className="w-full p-4 rounded-[12px] border-[1.2px] text-[17px] text-medium border-gray-50 bg-[#F4F5F7]/60 text-gray-700 outline-none"
              />
            </div>

          {!isEditing && (
            <img 
              src={line} 
              alt="구분선" 
              className="w-full mt-[203px] mb-[30px]"
                />
            )}
            <div className={`w-full ${isEditing ? 'mt-auto pt-[230px]' : ''}`}>
              {isEditing ? (
                <button
                  onClick={handleComplete}
                  disabled={!!errorMessage}
                  className="w-full py-4 bg-blue-500 text-white rounded-[12px] font-bold"
                >
                  완료
                </button>
              ) : (
                <div className="flex flex-col space-y-[30px]">
                  <button className="text-left text-[14px] text-medium text-gray-500/80">비밀번호 변경</button>
                  <button className="text-left text-[14px] text-medium text-stock-buy">서비스 탈퇴</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;