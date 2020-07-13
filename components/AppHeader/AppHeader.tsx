import React from 'react';
import Logo from '../Logo/Logo';
import styled from 'styled-components';

const StyledAppHeader = styled.header`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 48px;
  background-color: #28284f;
`;

const AppHeader: any = () => (
  <StyledAppHeader className="header">
    <div className="container mx-auto">
      <Logo />
    </div>
  </StyledAppHeader>
);

export default AppHeader;
