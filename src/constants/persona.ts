import type { Question } from '@/types/persona';
export const MOCK_QUESTIONS: Question[] = [
  {
    id: 1,
    questionCode: "Q1",
    content: "주가가 -5% 하락했을 때,\n{nickname}님의 반응은?",
    options: [
      { id: 1, choiceCode: "A", content: "“왜 떨어졌지?” 차분히 분석한다" },
      { id: 2, choiceCode: "B", content: "“불안해...” 계속 앱을 확인한다" },
      { id: 3, choiceCode: "C", content: "“오히려 좋아!” 추가 매수한다" },
    ],
  },
  {
    id: 2,
    questionCode: "Q2",
    content: "어떤 종목을 살 때,\n가장 먼저 보는 것은?",
    options: [
      { id: 4, choiceCode: "A", content: "기업 실적과 재무제표 (숫자)" },
      { id: 5, choiceCode: "B", content: "주변 추천이나 요즘 뜨는 뉴스" },
      { id: 6, choiceCode: "C", content: "차트의 흐름과 거래량 모양" },
    ],
  },
  {
    id: 3,
    questionCode: "Q3",
    content: "{nickname}님이 추구하는\n투자 스타일은?",
    options: [
      { id: 7, choiceCode: "A", content: "원금을 지키며 천천히 불리기" },
      { id: 8, choiceCode: "B", content: "리스크가 커도 높은 수익 노리기" },
      { id: 9, choiceCode: "C", content: "기회를 포착해 빠르게 수익 내기" },
    ],
  },
];