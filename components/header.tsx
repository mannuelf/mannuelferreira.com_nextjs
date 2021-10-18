import React from 'react';
import Logo from '@components/Logo';
import Container from '@components/container';
import Link from 'next/link';

const Header = () => (
  <header className='bg-purple top-0 flex-none flex z-10'>
    <Container>
      <Logo />
    </Container>
  </header>
);

export default Header;
