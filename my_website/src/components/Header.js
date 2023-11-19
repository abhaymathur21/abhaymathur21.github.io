import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  background-color: #333;
  color: white;
  padding: 1rem;
  text-align: center;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <h1>Abhay Mathur</h1>
      <p>ML Developer | Backend Web Developer</p>
    </HeaderWrapper>
  );
};

export default Header;
