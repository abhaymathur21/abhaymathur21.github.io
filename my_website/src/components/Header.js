import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import WAVES from "vanta/dist/vanta.waves.min";
// import { Parallax, ParallaxLayer } from "@react-spring/parallax";

const HeaderWrapper = styled.footer`
  color: #fff;
  min-height: 100vh;
  padding: 2rem;
  margin: 0;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;

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
    transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  }

  .sideQuestNote {
    opacity: 0.95;
    transform: translateY(-0.5px);
  }

  .sideQuestHandle {
    text-decoration: none;
    cursor: pointer;
  }

  .sideQuestHandle:hover .sideQuestPill {
    transform: scale(1.08);
    background: rgba(0, 0, 0, 0.28);
    border-color: rgba(255, 255, 255, 0.35);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }

  .nowHandle {
    text-decoration: none !important;
    display: inline-flex;
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
    transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  }

  .nowHandle:hover .nowPill {
    transform: scale(1.08);
    background: rgba(0, 0, 0, 0.28);
    border-color: rgba(255, 255, 255, 0.35);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
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
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    margin: 0.95rem auto 0.15rem;
    padding: 0.55rem 0.9rem;
    border-radius: 999px;
    font-weight: 900;
    letter-spacing: 0.2px;
    color: rgba(255, 255, 255, 0.7);
    background: rgba(0, 0, 0, 0.22);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  .tldr .tldr-content {
    color: #ffffff;
  }

  .tldr::after {
    content: "No, this is not a button.";
    position: absolute;
    bottom: -1.3rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.72rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.55);
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.25s ease;
    pointer-events: none;
    font-style: italic;
  }

  .tldr:hover::after {
    opacity: 1;
  }

  .ps {
    margin-top: 1rem;
    padding-top: 0.9rem;
    border-top: 1px solid rgba(255, 255, 255, 0.18);
    font-size: 0.98rem;
    font-style: italic;
  }

  .button {
    position: relative;
    display: inline-block;
    padding: 0.9rem 2.2rem;
    margin-top: 1.6rem;
    margin-bottom: 0rem;
    font-size: 1.15rem;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    color: #124572;
    background: rgba(255, 255, 255, 0.75);
    border: none;
    border-radius: 14px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
    transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    overflow: hidden;
    z-index: 1;
    letter-spacing: 0.3px;
  }

  .button::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      105deg,
      transparent 20%,
      rgba(18, 69, 114, 0.05) 40%,
      rgba(18, 69, 114, 0.1) 50%,
      rgba(18, 69, 114, 0.05) 60%,
      transparent 80%
    );
    transition: left 0.6s ease;
    z-index: -1;
  }

  .button:hover {
    background: #fff;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
    color: #0d3b66;
    transform: translateY(-2px);
  }

  .button:hover::before {
    left: 100%;
  }

  .button:active {
    transform: translateY(0px);
    box-shadow:
      0 2px 12px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }

  @media (max-width: 720px) {
    padding: 1.5rem 1.8rem;

    .name {
      font-size: 2.6rem;
      margin: 0.15rem 0 0.4rem;
    }

    .intro {
      font-size: 0.95rem;
    }

    /* Remove glass container on mobile — facts become their own cards */
    .glass {
      padding: 0;
      margin-top: 0.6rem;
      background: transparent;
      border: none;
      box-shadow: none;
      backdrop-filter: none;
    }

    .bio {
      text-align: center;
    }

    .bioGrid {
      grid-template-columns: 1fr;
      gap: 0;
    }

    .bioLeft {
      margin-bottom: 0;
    }

    .lead {
      font-size: 0.88rem;
      line-height: 1.6;
      margin-bottom: 0;
    }

    /* TLDR becomes the hero tagline right under the bio */
    .tldr {
      margin: 2rem auto 0;
      font-size: 0.95rem;
      padding: 0.5rem 0.9rem;
    }

    /* Facts area: no border, becomes horizontal scroll */
    .bioRight {
      padding-left: 0;
      border-left: 0;
      padding-top: 1.8rem;
      border-top: none;
      margin-left: -1.25rem;
      margin-right: -1.25rem;
    }

    .facts {
      display: flex;
      flex-direction: row;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      gap: 0;
      padding: 0.4rem 0;
      -ms-overflow-style: none;
      scrollbar-width: none;
      max-width: 100%;
    }

    .facts::-webkit-scrollbar {
      display: none;
    }

    /* Each fact becomes a glassmorphism card */
    .fact {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: calc(100% - 3rem);
      flex-shrink: 0;
      scroll-snap-align: center;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 16px;
      padding: 1.1rem 1rem;
      margin: 0 1.5rem;
      backdrop-filter: blur(8px);
      row-gap: 0.35rem;
      box-sizing: border-box;
    }

    .factLabel {
      font-size: 0.68rem;
      margin-bottom: 0;
      text-align: center;
    }

    .factValue {
      text-align: center;
    }

    .factDivider {
      display: none;
    }

    .sideQuestRow {
      justify-content: center;
    }

    .button {
      padding: 0.75rem 1.8rem;
      font-size: 1rem;
      margin-top: 1.2rem;
      background: #fff;
      color: #0d3b66;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
    }

    .button:hover {
      transform: none;
    }

    .button::before {
      display: none;
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
  display: block;
  margin-top: 1.5rem;
  color: #fff;
  font-size: 2.3rem;
  cursor: pointer;
  animation: bounce 2s ease-in-out infinite;

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(10px);
    }
  }

  &:hover {
    animation-play-state: paused;
    opacity: 0.8;
  }

  @media (max-width: 720px) {
    margin-top: 1rem;
    font-size: 1.8rem;
  }
`;

const EasterEggToast = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%) translateY(${(props) => (props.$show ? "0" : "80px")});
  opacity: ${(props) => (props.$show ? 1 : 0)};
  background: rgba(13, 59, 102, 0.85);
  backdrop-filter: blur(12px);
  color: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 0.8rem 1.4rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  pointer-events: ${(props) => (props.$show ? "auto" : "none")};
  cursor: pointer;
  z-index: 9999;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  max-width: calc(100vw - 2rem);
  text-align: center;
  box-sizing: border-box;

  @media (max-width: 600px) {
    width: calc(100vw - 2rem);
    max-width: none;
    bottom: 6rem;
  }
`;

const easterEggMessages = [
  "Yes, I play guitar. No, I won't play Wonderwall. (Click again for Instagram)",
  "Music is my therapy. AI pays for it. (Tap again to see more)",
  "I debug code and sheet music with equal frustration. (Click again for Instagram)",
  "Trained neural networks by day and my ears by night. (Tap again to see more)",
  "I once spent 3 hours on a bug. And 4 hours learning a song. Priorities. (Tap again to see more)",
];

const Header = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  // eslint-disable-next-line
  const [overlayState, setOverlayState] = useState(true);
  const [easterEgg, setEasterEgg] = useState({ show: false, msg: "" });
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

  const clickCount = useRef(0);
  const triggerEasterEgg = (e) => {
    e.preventDefault();
    e.stopPropagation();
    clickCount.current += 1;
    if (clickCount.current === 1) {
      const msg = easterEggMessages[Math.floor(Math.random() * easterEggMessages.length)];
      setEasterEgg({ show: true, msg });
      setTimeout(() => setEasterEgg({ show: false, msg }), 5000);
    } else {
      window.open(instagram.url, "_blank", "noreferrer noopener");
      clickCount.current = 0;
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

              <p className="tldr">TL;DR:&nbsp; <span className="tldr-content">I automate things.</span></p>
            </div>

            <div className="bioRight">
              <div className="facts">
                <div className="fact">
                  <div className="factLabel">Now</div>
                  <div className="factValue">
                    <a
                      href={linkedin.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="nowHandle"
                    >
                      <span className="nowPill">
                        <span className="nowLinkText">AI Engineer</span>&nbsp;@ Searce Inc.
                      </span>
                    </a>
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
                    <span
                      className="sideQuestHandle"
                      onClick={triggerEasterEgg}
                      role="button"
                      tabIndex={0}
                    >
                      <span className="sideQuestRow">
                        <span className="sideQuestPill">
                          <span className="sideQuestNote">♪</span>
                          Musician
                        </span>
                      </span>
                    </span>
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

        <DownArrow onClick={scrollToNextSection}>&darr;</DownArrow>
      </div>
      <EasterEggToast
        $show={easterEgg.show}
        onClick={() => window.open(instagram.url, "_blank", "noreferrer noopener")}
      >
        {easterEgg.msg}
      </EasterEggToast>
    </HeaderWrapper>
  );
};

export default Header;
