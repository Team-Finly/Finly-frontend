/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Tailwind의 기본 'sans' 폰트를 Pretendard로 교체합니다.
        sans: ['Pretendard', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },



      height: {
        screen: '100dvh', 
      },
    },
  },
  plugins: [],
};
