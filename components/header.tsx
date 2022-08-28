import React from 'react';
import Logo from '@components/Logo';
import Container from '@components/container';
import Link from 'next/link';

const Header = () => (
  <header className='bg-purple top-0 flex-none flex z-10'>
    <Container>
      <nav className='relative flex items-center justify-between h-16'>
        <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
          <button
            type='button'
            className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
            aria-controls='mobile-menu'
            aria-expanded='false'
          >
            menu
          </button>
        </div>
        <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
          <Logo customClass='grow-none' />
        </div>
        <div className='absolute right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
          <ul className='flex items-center justify-center sm:items-stretch sm:justify-start flex-row'>
            <li>
              <Link href='/'>
                <a className='text-white p-2 rounded-md text-base font-normal'>
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link href='/articles'>
                <a className='text-white p-2 rounded-md text-base font-normal'>
                  Articles
                </a>
              </Link>
            </li>
            <li>
              <Link href='/past'>
                <a className='text-white p-2 rounded-md text-base font-normal'>
                  Past
                </a>
              </Link>
            </li>
            <li>
              <Link href='/present'>
                <a className='text-white p-2 rounded-md text-base font-normal'>
                  Present
                </a>
              </Link>
            </li>
            <li>
              <Link href='/read-it'>
                <a className='text-white p-2 rounded-md text-base font-normal'>
                  Read It
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </Container>
  </header>
);

export default Header;
