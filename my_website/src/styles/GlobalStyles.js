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

  section {
    padding: 0 1rem;
    margin-top: -0.5rem;
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

  .contact_heading {
    margin: 0
  }

  .contact_button {
    margin: 1rem;
    display: inline-flex;
    padding: 1rem;
    text-decoration: none;
    cursor: pointer;
    background-color: #fff;
    color: #1A4699;
    border: none;
    border-radius: 50%;
    width: 5px;
    height: 5px;
    display: inline-flex;
    align-items: center;
    justify-content: center;

  }
  .contact_button:hover {
    background-color: #004466;
  }

  #aboutMeSection {
    max-width: 27.4rem;
    display: inline-block;
    margin-right: 13rem;  
    padding-left: 5rem;
    // padding-top: 1rem;
    // margin-top: 1rem;
  }

  #aboutMeParagraph {
    max-width: 27rem;
  }

  #aboutMeHeading {
    padding-top: 1rem;
  }

  #projectSection {
    display: inline-block;
    // padding-bottom: 10rem;
  }

  #projectHeading {
    margin: 1.5rem;
    margin-bottom: 2.2rem;
  }

  #projectsList {
    margin-top: -1rem;
  }

  .projectListItem {
    margin-bottom: 0.4rem;
  }

  .projectListItem1 {
    margin-bottom: 0.4rem;
  }

  .project:hover {
    background-color: #B2C8F1;
  }

  #contactSection {
    text-align: center;
    padding-top: 2rem;
  }
`;

export default GlobalStyles;
