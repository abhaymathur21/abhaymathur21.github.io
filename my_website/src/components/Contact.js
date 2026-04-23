import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import useScrollReveal from "../hooks/useScrollReveal";

const ContactSection = styled.footer`
  background-color: #2a6cb6;
  color: white;
  padding: 1rem 0;
  text-align: center;
  width: 100%;
  text-align: center;
  padding-top: 2rem;

  .contact_heading {
    margin: 0;
  }

  .contact_button {
    position: relative;
    margin: 1rem;
    display: inline-flex;
    padding: 1.05rem;
    text-decoration: none;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    font-size: 1.05rem;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
  }
  .contact_button:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-3px) scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
  .contact_button::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: -1.2rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.72rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.7);
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.25s ease;
    pointer-events: none;
  }
  .contact_button:hover::after {
    opacity: 1;
  }
`;

const Contact = () => {
  const revealRef = useScrollReveal(".reveal", 50);
  return (
    <ContactSection ref={revealRef}>
      <h2 className="contact_heading reveal section-heading">Contact</h2>
      <a
        href="mailto:a21.mathur21@gmail.com"
        className="contact_button"
        data-tooltip="Email"
        target="_blank"
        rel="noreferrer noopener"
      >
        <FontAwesomeIcon icon={faEnvelope} />
      </a>
      <a
        href="https://www.linkedin.com/in/abhaymathur21/"
        className="contact_button"
        data-tooltip="LinkedIn"
        target="_blank"
        rel="noreferrer noopener"
      >
        <FontAwesomeIcon icon={faLinkedin} />
      </a>
      <a
        href="https://github.com/abhaymathur21"
        className="contact_button"
        data-tooltip="GitHub"
        target="_blank"
        rel="noreferrer noopener"
      >
        <FontAwesomeIcon icon={faGithub} />
      </a>
      <p>&copy; 2026 Abhay Mathur</p>
    </ContactSection>
  );
};

export default Contact;
