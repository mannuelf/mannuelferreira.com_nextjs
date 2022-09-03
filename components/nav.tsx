import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import Link from 'next/link';

type Props = {
  fixed: boolean;
};

const menuItems = [
  { href: '/', text: 'Home' },
  { href: '/articles', text: 'Articles' },
  { href: '/past', text: 'Past' },
  { href: '/present', text: 'Present' },
  { href: '/books', text: 'Books' },
];

const NavBar = ({ fixed }: Props) => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  useEffect(() => setNavbarOpen(false), []);

  return (
    <>
      <nav className='relative flex flex-wrap items-center justify-between px-0 py-0 mb-0'>
        <div className='container flex flex-wrap items-center justify-between px-0 mx-auto'>
          <div className='relative flex justify-between w-full lg:w-auto lg:static lg:block lg:justify-start'>
            <Logo customClass='grow-none' />
            <button
              className='block px-3 py-1 text-xl leading-none text-white bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none'
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
                    <a className='block pt-4 pb-4 text-base font-normal text-white md:px-4 rounded-md'>
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
};

export default NavBar;
