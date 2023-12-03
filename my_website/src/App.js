import React from "react";
import Header from "./components/Header";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import GlobalStyles from "./styles/GlobalStyles";
import styled from "styled-components";

const Gradient = styled.footer`
  background: linear-gradient(to bottom, rgba(52, 148, 230, 1), #cddfff);
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Gradient>
        <Experience />
        <Projects />
      </Gradient>
      <Contact />
    </>
  );
}

export default App;
