import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    /* Matches hero / gradient top so sub-pixel gaps never flash white */
    background-color: rgb(52, 148, 230);
  }

  h1, h2, h3, h4 {
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  .section-heading {
    font-size: 2.4rem;
    font-weight: 900;
    color: #124572;
    letter-spacing: -0.3px;
    display: inline-block;
    position: relative;
    padding-bottom: 0.55rem;
  }

  .section-heading::after {
    display: none;
  }

  @media (max-width: 768px) {
    .section-heading {
      font-size: 2rem;
      display: block;
      text-align: center;
    }
    .section-heading::after {
      left: 50%;
      transform: translateX(-50%);
    }
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
