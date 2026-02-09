import { useEffect, useState, type ChangeEvent } from "react";
import { useUserStore } from "@/store/userStore";
import defaultprofileIcon from "@/assets/icons/profile.svg";
import {getMyProfile, updateNickname, deleteProfileImage, updateProfileImage, addProfileImage} from "@/apis/userApi";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
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
        let serverImage = defaultprofileIcon;
        if (data.profileImageUrl) {
          if (data.profileImageUrl.startsWith('http')) {
            serverImage = data.profileImageUrl;
          } else {
            serverImage = `${BASE_URL}${data.profileImageUrl}`;
          }
        }
      
        setUserInfo({ 
          nickname: data.nickname, 
          email: data.email,
          profileImage: serverImage
        });
        setNickname(data.nickname);
        setEmail(data.email);
        setProfileImage(serverImage);
        setInitialNickname(data.nickname);
        setInitialImage(serverImage);
      } catch (error) {
        console.error("프로필 로드 실패:", error);
      }
    };
    fetchProfile();
  }, [setUserInfo]);

 const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; 
    if (file) {
      if (!file.type.startsWith("image/")) {
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
    if (errorMessage) return;

    try {
      if (nickname !== initialNickname) {
        await updateNickname(nickname);
      }
      let finalProfileImageUrl = profileImage;
      if (imageFile) {
        let response;
        if (initialImage && initialImage !== defaultprofileIcon) {
          response = await updateProfileImage(imageFile);
        } else {
           response = await addProfileImage(imageFile);
        }
        if (response && response.result && response.result.profileImageUrl) {
          finalProfileImageUrl = response.result.profileImageUrl.startsWith('http')
            ? response.result.profileImageUrl
            : `${BASE_URL}${response.result.profileImageUrl}`;
        }
      } 
      else if (isImageDeleted) {
        await deleteProfileImage();
        finalProfileImageUrl = defaultprofileIcon;
      }

      setUserInfo({ 
        nickname, 
        profileImage: finalProfileImageUrl ===defaultprofileIcon ? null : finalProfileImageUrl 
      });

      setIsEditing(false);
      setInitialNickname(nickname);
      setInitialImage(finalProfileImageUrl);
      setErrorMessage("");
      setImageFile(null);
      setIsImageDeleted(false);

    } catch (error) {
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