import React from 'react';
import styled from 'styled-components';
import svgLogo from '../../assets/logo.svg';
import { theme } from 'shared/GlobalStyle';

const StyledLogo = styled.a`
  display: block;
  background-color: transparent;
  width: 96px;
  color: ${theme.color.lightestGrey};
  font-size: 2.9rem;
  line-height: 48px;
  margin-top: 8px;
  img {
    width: 100%;
  }
`;

const Logo = () => {
  return (
    <StyledLogo href="/">
      <img src={svgLogo} alt="Mannuel Ferreira" />
    </StyledLogo>
  );
};

export default Logo;
