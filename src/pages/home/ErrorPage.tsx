import React from 'react';
import ErrorIcon from '../../assets/images/error.svg';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-1 flex-col items-center px-4">
      <img src={ErrorIcon} alt="에러 이미지" className="mt-45 mb-[7px]" />
      <p className="text-lg font-semibold">페이지를 찾을 수 없어요</p>
      <div className="absolute bottom-15 left-0 flex w-full flex-col gap-3 px-4">
        <button
          onClick={() => navigate('/')}
          className="bg-secondary h-12.5 w-full cursor-pointer rounded-xl text-lg font-semibold text-white"
        >
          홈으로 돌아가기
        </button>
        <button
          onClick={() => navigate(-1)}
          className="h-12.5 w-full cursor-pointer rounded-xl bg-gray-50 text-lg font-semibold text-gray-500"
        >
          이전 페이지
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
