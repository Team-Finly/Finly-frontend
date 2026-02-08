import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const usePasswordChange = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const regex=/^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/;
  const isPwValid = regex.test(password);
  const isMatch = password === pwConfirm && pwConfirm.length > 0;
  const isValid = isPwValid && isMatch;


  const handleSubmit = async () => {
    if (!isValid) return;

    try {
      console.log("비밀번호 변경 요청:", password);
      alert("비밀번호가 변경되었습니다.");
      navigate(-1); 
    } catch (error) {
      console.error(error);
      alert("변경에 실패했습니다.");
    }
  };

  return {
    state: {
      password,
      pwConfirm,
      isPwValid,
      isMatch,
      isValid
    },
    actions: {
      setPassword,
      setPwConfirm,
      handleSubmit
    }
  };
};