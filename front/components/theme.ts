import { createContext } from "react";

const theme = {
  white: "#fff",
  darkGrey: "#999",
  lightGrey: "#f9f9f9",
  kakaoBg: "#f9e000",
  kakaoText: "#371D1E",
  naverBg: "#2AC308",
  black: "#000",
};

export const Theme = createContext(theme);
