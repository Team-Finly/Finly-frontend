import { useEffect, useState, type ChangeEvent } from "react";
import { useUserStore } from "@/store/userStore";
import defaultprofileIcon from "@/assets/icons/profile.svg";
import {getMyProfile, updateNickname} from "@/apis/userApi";

export const useProfileSettings = () => {
  const { email: storeEmail, nickname: storeNickname, profileImage: storeImage, setUserInfo } = useUserStore();

  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(storeImage);
  const [nickname, setNickname] = useState(storeNickname);
  const [email, setEmail] = useState(storeEmail);
  const [imageFile, setImageFile] = useState<File | null>(null); 
  const [isImageDeleted, setIsImageDeleted] = useState(false); 
  const [initialImage, setInitialImage] = useState(storeImage);
  const [initialNickname, setInitialNickname] = useState(storeNickname);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile(); 
      
        setUserInfo({ 
          nickname: data.nickname, 
          email: data.email,
          profileImage: data.profileImage
        });
        setNickname(data.nickname);
        setEmail(data.email);
        setProfileImage(data.profileImage ?? defaultprofileIcon);
        setInitialNickname(data.nickname);
        setInitialImage(data.profileImage);
      } catch (error) {
        console.error("프로필 로드 실패:", error);
      }
    };
    fetchProfile();
  }, [setUserInfo]);

 const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // 이벤트에서 파일 추출
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 선택할 수 있어요.");
        return;
      }
      if (profileImage && profileImage.startsWith("blob:")) {
        URL.revokeObjectURL(profileImage);
      }
      setImageFile(file);
      setProfileImage(URL.createObjectURL(file));
      setIsImageDeleted(false);
    }
  };

  const handleResetImage = () => {
    if (profileImage && profileImage.startsWith("blob:")) {
      URL.revokeObjectURL(profileImage);
    }
    setProfileImage(defaultprofileIcon);
    setImageFile(null);
    setIsImageDeleted(true);
  };

  const handleNicknameChange = (value: string) => {
    setNickname(value);
    const specialCharRegex = /[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]/;
    if (value.length < 2) setErrorMessage("최소 2자 이상 입력해 주세요");
    else if (specialCharRegex.test(value)) setErrorMessage("특수문자는 사용할 수 없어요");
    else setErrorMessage("");
  };

  const handleComplete = async () => {
    if (!errorMessage) {
      {
        try{
          await updateNickname(nickname);
          setUserInfo({ nickname });
          setIsEditing(false);
          setInitialNickname(nickname);
          setInitialImage(profileImage);
          setErrorMessage("");
        } catch (error) {
          console.error("닉네임 업데이트 실패:", error);
          setErrorMessage("닉네임 업데이트에 실패했습니다. 다시 시도해주세요.");
        }
      }
    }
  };
  const handleCancel = () => {
    setIsEditing(false);
    setIsModalOpen(false);
    setNickname(initialNickname);
    setProfileImage(initialImage);
    setImageFile(null);
    setIsImageDeleted(false);
    setErrorMessage("");
  };

  return {
    state: { isEditing, errorMessage, isModalOpen, isWithdrawModalOpen, profileImage, nickname, initialImage, initialNickname, email },
    actions: { setIsEditing, setIsModalOpen, setIsWithdrawModalOpen, handleFileChange, handleResetImage, handleNicknameChange, handleComplete, handleCancel }
  };
};