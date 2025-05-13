import { createContext } from "react";

const theme = {
  // 디자인
  // 봄
  // 여름
  main: "#72affe",
  subMain: "#81cede",
  lightMain: "#c3e8eb",
  point: "#ddd3c2",
  // 가을
  // 겨울

  // 관리자
  white: "#fff",
  grey: "#AAAAAA",
  darkGrey: "#999",
  lightGrey: "#F3F3F3",
  black: "#000",
  red: "#EE0000",
  // 버튼
  kakaoBg: "#f9e000",
  kakaoText: "#371D1E",
  naverBg: "#2AC308",
};

export const Theme = createContext(theme);
