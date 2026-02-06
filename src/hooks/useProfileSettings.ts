import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import defaultprofileIcon from "@/assets/icons/profile.svg";
import {getMyProfile} from "@/apis/userApi";

export const useProfileSettings = () => {
  const { email: storeEmail, nickname: storeNickname, profileImage: storeImage, setUserInfo } = useUserStore();

  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        const data = await getMyProfile(); //
        
        // 서버 데이터로 스토어와 로컬 상태를 한꺼번에 업데이트합니다.
        setUserInfo({ 
          nickname: data.nickname, 
          email: data.email 
        });
        setNickname(data.nickname);
        setEmail(data.email);
        setInitialNickname(data.nickname);
      } catch (error) {
        console.error("프로필 로드 실패:", error);
      }
    };
    fetchProfile();
  }, [setUserInfo]);

  
  const handleFileChange = (file: File | undefined) => {
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 선택할 수 있어요.");
        return;
      }
      setImageFile(file);
      setProfileImage(URL.createObjectURL(file));
      setIsImageDeleted(false);
    }
  };

  const handleResetImage = () => {
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

  const handleComplete = () => {
    if (!errorMessage) {
      setUserInfo({ nickname, profileImage });
      setIsEditing(false);
      setInitialNickname(nickname);
      setInitialImage(profileImage);
      setErrorMessage("");
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
    state: { isEditing, errorMessage, isModalOpen, profileImage, nickname, initialImage, initialNickname, email },
    actions: { setIsEditing, setIsModalOpen, handleFileChange, handleResetImage, handleNicknameChange, handleComplete, handleCancel }
  };
};