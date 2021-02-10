import { createGlobalStyle } from "styled-components";

export const Theme = {
  text: ["#000000", "#8a8a8a"], // [primary text, secondary text]
  surface: ["#FFFFFF", "#FAFAFA", "#d6d6d6"], // [White background, light grey, dark grey]
  primary: "#3623A9", // primary color
  primaryDark: "#1F1267", // primary dark
  secondary: "#D9B6F7",
  secondaryDark: "#9569BB",
};

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Nunito', sans-serif;
  }
`;
