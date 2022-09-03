import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import Link from 'next/link';

const menuItems = [
  { href: '/', text: 'Home' },
  { href: '/articles', text: 'Articles' },
  { href: '/past', text: 'Past' },
  { href: '/present', text: 'Present' },
  { href: '/books', text: 'Books' },
];

export default function Navbar({ fixed }) {
  const [navbarOpen, setNavbarOpen] = useState(false);

  useEffect(() => setNavbarOpen(false), []);

  return (
    <>
      <nav className='relative flex flex-wrap items-center justify-between px-0 py-0 mb-0'>
        <div className='container px-0 mx-auto flex flex-wrap items-center justify-between'>
          <div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
            <Link href='/'>
              <a className='font-bold leading-relaxed inline-block whitespace-nowrap uppercase text-white'>
                <Logo customClass='grow-none' />
              </a>
            </Link>
            <button
              className='text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
              type='button'
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className='fas fa-bars'></i>
            </button>
          </div>
          <div
            className={
              'lg:flex flex-grow items-center' +
              (navbarOpen ? ' flex' : ' hidden')
            }
          >
            <ul
              className={`flex flex-col lg:flex-row list-none lg:ml-auto ${
                navbarOpen ? 'mb-8' : ''
              }`}
            >
              {menuItems.map((menu) => (
                <li key={menu.text}>
                  <Link href={menu.href}>
                    <a className='text-white p-2 rounded-md text-base font-normal'>
                      {menu.text}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
