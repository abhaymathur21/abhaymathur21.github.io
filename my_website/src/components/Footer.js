import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #1A4699;
  color: white;
  padding: 1rem;
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <p>&copy; 2023 Abhay Mathur</p>
    </FooterWrapper>
  );
};

export default Footer;
