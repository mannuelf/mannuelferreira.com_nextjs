import React from 'react';
import Logo from '@components/Logo';
import styled from 'styled-components';
import Container from '@components/container';

const StyledAppHeader = styled.header`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 48px;
  line-height: 48px;
  background-color: #28284f;
`;

const Header = () => (
  <StyledAppHeader>
    <Container>
      <Logo />
    </Container>
  </StyledAppHeader>
);

export default Header;
