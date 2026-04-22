import React from "react";
import Header from "./components/Header";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Responsibilities from "./components/Responsibilities";
import Contact from "./components/Contact";
import GlobalStyles from "./styles/GlobalStyles";
import styled from "styled-components";

const Gradient = styled.footer`
  background: linear-gradient(to bottom, rgba(52, 148, 230, 1), #5da8d0 50%, #5a9fd4 80%, #2a6cb6);
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Gradient>
        <Experience />
        <Projects />
        <Achievements />
        <Responsibilities />
      </Gradient>
      <Contact />
    </>
  );
}

export default App;
