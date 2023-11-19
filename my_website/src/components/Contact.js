import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  background-color: #1a4699;
  color: white;
  padding: 0;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const Contact = () => {
  return (
    <FooterWrapper>
      <section id="contactSection">
        <h2 className="contact_heading">Contact</h2>
        <a
          href="mailto:a21.mathur21@gmail.com"
          className="contact_button"
          target="_blank"
          rel="noreferrer noopener"
        >
          <FontAwesomeIcon icon={faEnvelope} />

          {/* <span>Gmail</span> */}
        </a>
        <a
          href="https://www.linkedin.com/in/abhaymathur21/"
          className="contact_button"
          target="_blank"
          rel="noreferrer noopener"
        >
          <FontAwesomeIcon icon={faLinkedin} />
          {/* <span>LinkedIn</span> */}
        </a>
        <a
          href="https://github.com/abhaymathur21"
          className="contact_button"
          target="_blank"
          rel="noreferrer noopener"
        >
          <FontAwesomeIcon icon={faGithub} />
          {/* <span>Github</span> */}
        </a>
      </section>
      <p>&copy; 2023 Abhay Mathur</p>
    </FooterWrapper>
  );
};

export default Contact;
