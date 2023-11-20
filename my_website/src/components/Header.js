import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import WAVES from "vanta/dist/vanta.waves.min";

const HeaderWrapper = styled.footer`
  /* background-color: #1A4699; */
  color: white;
  padding: 1rem;
  margin: 0;
  text-align: center;
`;

const Header = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        WAVES({
          el: myRef.current,
          waveSpeed: 1.5,
          minHeight: 100.0,
          scale: 1.0,
          scaleMobile: 1.0,
          zoom: 1.5,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <HeaderWrapper ref={myRef} id="header">
      <h1>Abhay Mathur</h1>
      <p>20 | ML Engineer | Backend Web Developer</p>
    </HeaderWrapper>
  );
};

export default Header;
