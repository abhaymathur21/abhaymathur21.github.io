import React from "react";
import Header from "./components/Header";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Responsibilities from "./components/Responsibilities";
import Contact from "./components/Contact";
import GlobalStyles from "./styles/GlobalStyles";
import styled from "styled-components";

const Gradient = styled.div`
  background: linear-gradient(to bottom, rgba(52, 148, 230, 1), #5da8d0 50%, #5a9fd4 80%, #2a6cb6);
`;

const WaveDivider = styled.div`
  line-height: 0;
  overflow: hidden;
  background: ${(props) => props.$bg || "transparent"};

  svg {
    display: block;
    width: 100%;
    height: 60px;

    @media (max-width: 768px) {
      height: 36px;
    }
  }
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <WaveDivider $bg="rgba(52, 148, 230, 1)">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path
            d="M0,60 C360,0 720,48 1080,12 C1260,0 1380,24 1440,36 L1440,0 L0,0 Z"
            fill="rgba(52, 148, 230, 1)"
            opacity="0"
          />
          <path
            d="M0,0 C240,50 480,20 720,40 C960,60 1200,10 1440,30 L1440,60 L0,60 Z"
            fill="rgba(52, 148, 230, 1)"
          />
          <path
            d="M0,20 C360,55 720,5 1080,45 C1260,55 1380,25 1440,35 L1440,60 L0,60 Z"
            fill="rgba(52, 148, 230, 0.6)"
          />
        </svg>
      </WaveDivider>
      <Gradient>
        <Experience />
        <Projects />
        <Achievements />
        <Responsibilities />
      </Gradient>
      <WaveDivider $bg="#2a6cb6">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path
            d="M0,30 C240,0 480,50 720,20 C960,0 1200,40 1440,10 L1440,60 L0,60 Z"
            fill="#2a6cb6"
          />
          <path
            d="M0,40 C360,10 720,55 1080,20 C1260,10 1380,35 1440,25 L1440,60 L0,60 Z"
            fill="rgba(42, 108, 182, 0.6)"
          />
        </svg>
      </WaveDivider>
      <Contact />
    </>
  );
}

export default App;
