import { createContext } from "react";

const theme = {
  basic: "#f23444",
  white: "#fff",
  darkGrey: "#999",
  lightGrey: "#f9f9f9",
};

export const Theme = createContext(theme);
