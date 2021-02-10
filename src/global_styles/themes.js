import { createGlobalStyle } from "styled-components";

export const Theme = {
  text: ["#000000", "#8a8a8a"], // [primary text, secondary text]
  surface: ["#FFFFFF", "#FAFAFA", "#d6d6d6", "#bfbfbf"], // [White background, light grey, dark grey]
  primary: "#3623A9", // primary color
  primaryDark: "#1F1267", // primary dark
  secondary: "#D9B6F7",
  secondaryDark: "#9569BB",
  background: "#F6EBFF",
  orange: "#EB915F",
};

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Nunito', sans-serif;
  }
`;
