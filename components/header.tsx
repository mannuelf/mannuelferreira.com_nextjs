import React from 'react';
import Logo from '@components/Logo';
import Container from '@components/container';

const Header = () => (
  <header className='bg-purple sticky top-0 flex-none flex z-10'>
    <Container>
      <Logo />
    </Container>
  </header>
);

export default Header;
