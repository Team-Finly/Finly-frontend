import {TERMS_CONTENT} from '@/constants/terms';

interface Term {
  termId: number;
  title: string;
  required: boolean;
}

export const useTermsList = () => {
  const mockData: Term[] = [
    { 
      termId: 1, 
      title: TERMS_CONTENT["1"].title, 
      required: true 
    },
    { 
      termId: 2, 
      title: TERMS_CONTENT["2"].title,
      required: true 
    },
    { 
      termId: 3, 
      title: TERMS_CONTENT["3"].title, 
      required: false 
    },
  ];

  return { data: mockData };
};