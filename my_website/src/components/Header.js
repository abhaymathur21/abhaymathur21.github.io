import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import WAVES from "vanta/dist/vanta.waves.min";
// import { Parallax, ParallaxLayer } from "@react-spring/parallax";

const HeaderWrapper = styled.footer`
  color: #fff;
  padding: 7rem;
  margin: 0;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;

  .button {
    display: inline-block;
    padding: 1rem 1.5rem;
    margin-top: 2.4rem;
    margin-bottom: 0rem;
    opacity: 0.9;
    font-size: 1.3rem;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    background-color: #ebf2ff;
    color: #0077cc;
    border: none;
    border-radius: 5px;
  }
  .button:hover {
    background-color: #004466;
  }

  #aboutMeParagraph {
    display: inline-block;
    margin: 0 0;
    text-align: center;
    max-width: 57rem;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(205, 223, 255, 0),
    rgba(52, 148, 230, 1)
  );
  opacity: ${({ overlayState }) => (overlayState ? 1 : 0)};
  transition: opacity 1s ease;
  pointer-events: none; // This makes sure that you can still click the button 'through' the overlay div
`;

const DownArrow = styled.a`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-size: 2.3rem;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateX(-50%) translateY(-0.5rem);
  }
`;

const Header = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  // eslint-disable-next-line
  const [overlayState, setOverlayState] = useState(true);
  const myRef = useRef(null);
  // const ref = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        WAVES({
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          waveSpeed: 1.5,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          zoom: 1.5,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect, overlayState]);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("experienceHeading");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <HeaderWrapper ref={myRef}>
      <Overlay overlayState={overlayState} />

      <h1 style={{ fontWeight: "900" }}>Abhay Mathur</h1>
      <p>20 | ML Engineer | Full Stack Web Developer</p>
      <p id="aboutMeParagraph">
        I am a student in the field of Artificial Intelligence and Machine
        Learning. I am highly motivated, possess excellent problem-solving
        skills and thrive in collaborative team environments.
        <a
          href="https://drive.google.com/file/d/137-aDE24Vqy24Yttrl4pNa46cVvgIcy2/view?usp=sharing"
          className="button"
          target="_blank"
          rel="noreferrer noopener"
          style={{ fontWeight: "600" }}
        >
          My Resume
        </a>
      </p>

      <Overlay />
      <DownArrow onClick={scrollToNextSection}>&darr;</DownArrow>
    </HeaderWrapper>
  );
};

export default Header;
