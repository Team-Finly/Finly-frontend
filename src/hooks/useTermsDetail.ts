import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { authApi } from '@/apis/authApi';

export const useTermDetail = (id: string | undefined) => {
  const navigate = useNavigate();

  const { data: termDetail, isLoading, isError, error } = useQuery({
    queryKey: ['termDetail', id], 
    queryFn: () => authApi.getTermDetail(Number(id)), 
    enabled: !!id, 
  });

  useEffect(() => {
    if (isError) {
      console.error("약관 상세 조회 실패:", error);
      alert("내용을 불러오지 못했습니다.");
      navigate(-1);
    }
  }, [isError, error, navigate]);

  return { termDetail, isLoading };
};