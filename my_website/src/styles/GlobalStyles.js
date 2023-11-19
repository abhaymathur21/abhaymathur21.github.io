import { createGlobalStyle } from 'styled-components';

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

  section {
    padding: 0 1rem;
  }

  .button {
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    background-color: #0077cc;
    color: #fff;
    border: none;
    border-radius: 5px;
  }
  .button:hover {
    background-color: #004466;
  }

  .project:hover {
    background-color: #B2C8F1;
  }

  .contact_heading {
    margin: 0
  }

  .contact_button {
    margin: 1rem 1rem;
    display: inline-block;
    padding: 10px 15px;
    font-size: 16px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    background-color: #0077cc;
    color: #fff;
    border: none;
    border-radius: 5px;
  }
  .contact_button:hover {
    background-color: #004466;
  }
`;

export default GlobalStyles;
