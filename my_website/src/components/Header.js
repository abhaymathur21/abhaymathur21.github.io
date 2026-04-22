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

  .content {
    display: inline-block;
    width: min(60rem, 100%);
  }

  .glass {
    margin: 1.25rem auto 0;
    padding: 1.4rem 1.6rem;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 18px 60px rgba(0, 0, 0, 0.18);
    backdrop-filter: blur(10px);
  }

  .bioGrid {
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    gap: 1.25rem;
    align-items: start;
  }

  .bioLeft,
  .bioRight {
    min-width: 0;
  }

  .bioRight {
    padding-left: 1.25rem;
    border-left: 1px solid rgba(255, 255, 255, 0.18);
  }

  .facts {
    display: grid;
    gap: 0.9rem;
  }

  .fact {
    display: grid;
    grid-template-columns: 78px 1fr;
    column-gap: 0.9rem;
    align-items: baseline;
  }

  .fact--vcenter {
    align-items: center;
  }

  .fact--vcenter .factLabel {
    line-height: 1;
  }

  .factLabel {
    font-size: 0.82rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.68);
    font-weight: 800;
    text-align: left;
  }

  .factValue {
    color: rgba(255, 255, 255, 0.92);
    font-weight: 650;
    line-height: 1.35;
    text-align: left;
  }

  .factValueStrong {
    color: rgba(255, 255, 255, 0.97);
    font-weight: 900;
    letter-spacing: 0.2px;
  }

  .factValueSub {
    margin-top: 0.25rem;
    color: rgba(255, 255, 255, 0.72);
    font-weight: 650;
  }

  .factValue a {
    color: rgba(255, 255, 255, 0.95);
    text-decoration: underline;
    text-underline-offset: 3px;
    font-weight: 800;
  }

  .sideQuestRow {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.55rem;
  }

  .sideQuestPill {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.35rem 0.65rem;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.18);
    border: 1px solid rgba(255, 255, 255, 0.16);
    color: rgba(255, 255, 255, 0.92);
    font-weight: 850;
    letter-spacing: 0.2px;
  }

  .sideQuestNote {
    opacity: 0.95;
    transform: translateY(-0.5px);
  }

  .sideQuestHandle {
    text-decoration: none;
    padding: 0.2rem 0.25rem;
    border-radius: 8px;
  }

  .sideQuestHandle:hover {
    background: rgba(197, 242, 255, 0.12);
  }

  .nowHandle {
    text-decoration: none;
    padding: 0.15rem 0.25rem;
    border-radius: 8px;
    display: inline-flex;
    text-decoration: none !important;
  }

  .nowHandle:hover {
    background: rgba(197, 242, 255, 0.12);
    text-decoration: none;
  }

  .nowPill {
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.18);
    border: 1px solid rgba(255, 255, 255, 0.16);
    color: rgba(255, 255, 255, 0.92);
    font-weight: 850;
    letter-spacing: 0.2px;
    white-space: nowrap;
  }

  .nowLinkText {
    color: rgba(197, 242, 255, 0.98);
    font-weight: 900;
  }

  .factDivider {
    margin: 0.2rem 0 0.35rem;
    height: 1px;
    background: rgba(255, 255, 255, 0.18);
  }

  .intro {
    margin: 0 0 0.35rem;
    font-size: 1.05rem;
    opacity: 0.88;
  }

  .name {
    margin: 0.25rem 0 0.85rem;
    font-weight: 900;
    letter-spacing: 0.2px;
    line-height: 1.05;
    text-shadow: 0 10px 30px rgba(0, 0, 0, 0.22);
  }

  .bio {
    margin: 0;
    text-align: left;
    line-height: 1.6;
    font-size: 1.05rem;
    color: rgba(255, 255, 255, 0.9);
  }

  .bio p {
    margin: 0.75rem 0;
  }

  .lead {
    font-size: 1.1rem;
    line-height: 1.65;
    color: rgba(197, 242, 255, 0.92);
  }

  .lead .highlight {
    color: rgba(255, 255, 255, 0.98);
    font-weight: 800;
  }

  .muted {
    color: rgba(255, 255, 255, 0.82);
  }

  .bio p:first-child {
    margin-top: 0;
  }

  .bio p:last-child {
    margin-bottom: 0;
  }

  .bio a {
    color: rgba(255, 255, 255, 0.95);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .tldr {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    margin: 0.95rem auto 0.15rem;
    padding: 0.55rem 0.9rem;
    border-radius: 999px;
    font-weight: 900;
    letter-spacing: 0.2px;
    color: #ffffff;
    background: rgba(0, 0, 0, 0.22);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  .ps {
    margin-top: 1rem;
    padding-top: 0.9rem;
    border-top: 1px solid rgba(255, 255, 255, 0.18);
    font-size: 0.98rem;
    font-style: italic;
  }

  .button {
    display: inline-block;
    padding: 1rem 1.5rem;
    margin-top: 1.6rem;
    margin-bottom: 0rem;
    opacity: 0.9;
    font-size: 1.3rem;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    background-color: #ffffff;
    color: #0077cc;
    border: none;
    border-radius: 5px;
  }
  .button:hover {
    background-color: #004466;
    color: #ffffff;
  }

  @media (max-width: 720px) {
    padding: 5rem 1.25rem;
    .glass {
      padding: 1.1rem 1.1rem;
    }
    .bio {
      text-align: center;
    }
    .bioGrid {
      grid-template-columns: 1fr;
    }
    .bioRight {
      padding-left: 0;
      border-left: 0;
      padding-top: 0.9rem;
      border-top: 1px solid rgba(255, 255, 255, 0.18);
    }
    .fact {
      grid-template-columns: 1fr;
      row-gap: 0.25rem;
    }
    .factLabel,
    .factValue {
      text-align: center;
    }
    .tldr {
      margin-left: auto;
      margin-right: auto;
    }
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
  const instagram = {
    handle: "ab_haymathur",
    url: "https://instagram.com/ab_haymathur",
  };
  const linkedin = {
    url: "https://linkedin.com/in/abhaymathur21",
  };

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
      <div className="content">
        <p className="intro">Hi, I’m</p>
        <h1 className="name">Abhay Mathur</h1>

        <div className="glass">
          <div className="bio bioGrid">
            <div className="bioLeft">
              <p className="lead">
                I&apos;m an <span className="highlight">AI Engineer</span>{" "}
                working to build{" "}
                <span className="highlight">Multi-Agent AI systems</span> and{" "}
                <span className="highlight">
                  Information Retrieval pipelines
                </span>{" "}
                that help companies gain valuable insights from their data and
                automate their workflows.
              </p>

              <p className="tldr">TL;DR I automate things.</p>
            </div>

            <div className="bioRight">
              <div className="facts">
                <div className="fact">
                  <div className="factLabel">Now</div>
                  <div className="factValue">
                    <span className="nowPill">
                      <a
                        href={linkedin.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="nowHandle"
                      >
                        <span className="nowLinkText">AI Engineer</span>
                      </a>{" "}
                      @ Searce Inc.
                    </span>
                  </div>
                </div>

                <div className="factDivider" />

                <div className="fact">
                  <div className="factLabel">Degree</div>
                  <div className="factValue">
                    <div className="factValueStrong">B.Tech (AI &amp; ML)</div>
                    <div className="factValueSub">
                      D.J. Sanghvi College of Engineering
                    </div>
                  </div>
                </div>

                <div className="factDivider" />

                <div className="fact fact--vcenter">
                  <div className="factLabel">Side quest</div>
                  <div className="factValue">
                    <a
                      href={instagram.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="sideQuestHandle"
                    >
                      <span className="sideQuestRow">
                        <span className="sideQuestPill">
                          <span className="sideQuestNote">♪</span>
                          Musician
                        </span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a
          href="/My%20Resume.pdf"
          className="button"
          target="_blank"
          rel="noreferrer noopener"
          style={{ fontWeight: "600" }}
        >
          My Resume
        </a>
      </div>

      <DownArrow onClick={scrollToNextSection}>&darr;</DownArrow>
    </HeaderWrapper>
  );
};

export default Header;
