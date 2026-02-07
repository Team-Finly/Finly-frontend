import { useEffect, useState } from 'react';
import { authApi } from '@/apis/authApi';

interface Term {
  termId: number;
  title: string;
  required: boolean;
}

export const useTermsList = () => {
  const [data, setData] = useState<Term[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const result = await authApi.getTerms(); 
        setData(result);
      } catch (error) {
        console.error("약관 목록 조회 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTerms();
  }, []);

  return { data, isLoading };
};