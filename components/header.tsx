import React from 'react';
import Container from '@components/container';
import Navigation from './navigation';

const Header = () => (
  <header className='bg-purple top-0 flex-none flex z-10'>
    <Container>
      <Navigation/>
    </Container>
  </header>
);

export default Header;
