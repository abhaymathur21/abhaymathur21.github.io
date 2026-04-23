import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;

  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .revealed {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default GlobalStyles;
