import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;

  }

  h1, h2, h3, h4 {
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  .button, .tldr, .nowPill, .sideQuestPill {
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.35s ease, transform 0.35s ease;
  }

  .revealed {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default GlobalStyles;
