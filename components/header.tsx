import React from 'react';
import Container from '@components/container';
import NavBar from './nav';

const Header = () => (
  <header className='bg-purple top-0 flex-none flex z-10'>
    <Container>
      <NavBar fixed={true}/>
    </Container>
  </header>
);

export default Header;
