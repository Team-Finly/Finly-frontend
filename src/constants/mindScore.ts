export const SCORE_CONFIG = [
  {
    min: 0,
    max: 39,
    label: "감정 영향 높음",
    color: "#F61010",
    desc: "시장의 흐름보다 감정의 영향을 더 많이 받고 있어요",
    highlight: "감정",
    title: "충동적인 토끼"
  },
  {
    min: 40,
    max: 69,
    label: "평균적 대응",
    color: "#FFF34A",
    desc: "일부 상황에서는 이성적으로 대응하고 있어요",
    highlight: "이성적",
    title: "신중한 거북이"
  },
  {
    min: 70,
    max: 84,
    label: "안정적 멘탈",
    color: "#0AE569",
    desc: "변동성 속에서도 비교적 안정적인 투자 태도를 유지하고 있어요",
    highlight: "안정적",
    title: "지혜로운 올빼미"
  },
  {
    min: 85,
    max: 100,
    label: "고도화된 멘탈",
    color: "#007AFF",
    desc: "시장을 감정이 아닌 기준으로 대하고 있어요",
    highlight: "기준",
    title: "냉철한 사자"
  },
] as const;