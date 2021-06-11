import React from 'react';
import styled from 'styled-components';
import { theme } from '@shared/GlobalStyle';

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
    <StyledLogo href='/'>
      <img
        src='../assets/icons/logo.svg'
        alt='Mannuel Ferreira'
        width={48}
        height={96}
      />
    </StyledLogo>
  );
};

export default Logo;
