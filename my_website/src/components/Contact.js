import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";

const ContactSection = styled.footer`
  background-color: #1a4699;
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
    margin: 1rem;
    display: inline-flex;
    padding: 1rem;
    text-decoration: none;
    cursor: pointer;
    background-color: #fff;
    color: #1a4699;
    border: none;
    border-radius: 50%;
    width: 5px;
    height: 5px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .contact_button:hover {
    background-color: #004466;
  }
`;

const Contact = () => {
  return (
    <ContactSection>
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
      <p>&copy; 2023 Abhay Mathur</p>
    </ContactSection>
  );
};

export default Contact;
