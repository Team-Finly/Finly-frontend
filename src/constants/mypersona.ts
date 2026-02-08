import turtle from "@/assets/icons/turtle.svg";
import turtlebg from "@/assets/icons/turtlebg.svg";
import deer from "@/assets/icons/deer.svg";
import deerbg from "@/assets/icons/deerbg.svg";
import eagle from "@/assets/icons/eagle.svg";
import eaglebg from "@/assets/icons/eaglebg.svg";
import lion from "@/assets/icons/lion.svg";
import lionbg from "@/assets/icons/lionbg.svg";


export const PERSONA_DATA = {
  TURTLE: {
    name: "신중한 거북이",
    subDesc: "과감한 면이 있으나,\n원칙(안정)이 우선하는 성향이에요",
    image: turtle,
    bgImage: turtlebg,
    bgStyle: "w-[150px] h-[150px]",
    advice: [
      "충분히 고민했어요. 이제는 기준을 정하고 한 번 움직여보세요",
      "모든 선택을 확신할 수는 없기에, 기록하며 조정하면 돼요.",
      "핀리는 망설임이 길어질 때 행동 타이밍을 알려줄게요!"
    ]
  },
  DEER: {
    name: "걱정 많은 사슴",
    subDesc: "불안이 앞서지만, 신중하게\n판단하려는 마음이 강한 성향이에요",
    image: deer,
    bgImage: deerbg,
    bgStyle: "w-[150px] h-[150px]",
    advice: [
      "불안할수록 감정만 보지 말고, 기록된 사실을 함께 보세요.",
      "감정이 판단을 대신하게 두지 마세요. 숫자는 늘 솔직해요.",
      "핀리는 불안이 커질 때, 지금 멈춰야 할지 아닌지 정리해줄게요!"
    ]
  },
  EAGLE: {
    name: "날카로운 독수리",
    subDesc: "빠른 판단을 선호하며,\n기회를 놓치지 않으려는 성향이에요",
    image: eagle,
    bgImage: eaglebg,
    bgStyle: "w-[150px] h-[150px]",
    advice: [
      "빠른 판단은 강점이지만, 이유 없는 확신은 위험해요.",
      "결정 전 한 번만 감정 기록을 확인하는 습관을 가져보세요.",
      "핀리는 당신의 선택이 충동인지 전략인지 구분해줄게요!"
    ]
  },
  LION: {
    name: "불타는 사자",
    subDesc: "리스크를 감수하더라도,\n성장을 위해 과감히 선택하는 성향이에요",
    image: lion,
    bgImage: lionbg,
    bgStyle: "w-[150px] h-[150px]",
    advice: [
      "과감함은 좋지만, 모든 판에 전력을 다할 필요는 없어요.",
      "확신이 강할수록 손실 기준을 먼저 정해두세요.",
      "핀리는 큰 승부 전에 리스크부터 점검해줄게요!"
    ]
  },
};

export type PersonaKey = keyof typeof PERSONA_DATA;