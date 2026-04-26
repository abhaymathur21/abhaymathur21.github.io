import React, { useState } from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
  @media (max-width: 768px) {
    padding: 1.25rem 0;
    isolation: isolate;

    /* Adjacent roots: overlap to hide GPU hairline between collapsed Content clips */
    & + & {
      margin-top: -16px;
      padding-top: calc(1.25rem + 16px);
    }
  }
`;

const Toggle = styled.div`
  @media (max-width: 768px) {
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    & > * {
      margin-bottom: 0 !important;
      padding-top: 0 !important;
    }
  }
`;

const Chevron = styled.span`
  display: none;

  @media (max-width: 768px) {
    display: inline-block;
    transition: transform 0.3s ease;
    transform: rotate(${(props) => (props.$open ? "180deg" : "0deg")});
    font-size: 0.6em;
    color: #124572;
    opacity: 0.5;
    vertical-align: middle;
    margin-left: 0.4rem;
  }
`;

const Content = styled.div`
  @media (max-width: 768px) {
    max-height: ${(props) => (props.$open ? "10000px" : "0")};
    padding-top: ${(props) => (props.$open ? "1.5rem" : "0")};
    transition: max-height 0.45s ease-in-out, padding-top 0.45s ease-in-out;

    ${(props) =>
      props.$open
        ? css`
            overflow: visible;
          `
        : css`
            overflow: hidden;
            @supports (overflow: clip) {
              overflow: clip;
            }
          `}

    & > *:first-child > ${Wrapper}:first-child {
      padding-top: 0;
    }
  }
`;

const MobileCollapsible = ({ renderHeader, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Wrapper>
      <Toggle onClick={() => setOpen((o) => !o)}>
        {renderHeader(<Chevron $open={open}>▾</Chevron>)}
      </Toggle>
      <Content $open={open}>{children}</Content>
    </Wrapper>
  );
};

export default MobileCollapsible;
