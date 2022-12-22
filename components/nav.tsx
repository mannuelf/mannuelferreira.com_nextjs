import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import Link from 'next/link';
import { MenuItem, NavProps } from './nav.types';
import menuItems from './nav.data';

const NavBar = ({ position }: NavProps) => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  useEffect(() => setNavbarOpen(false), []);

  return (
    <>
      <nav className={`${position} flex flex-wrap items-center justify-between `}>
        <div className='container flex flex-wrap items-center justify-between mx-auto'>
          <div className='relative flex justify-between w-full lg:w-auto lg:static lg:block lg:justify-start'>
            <Logo customClass='grow-none mt-1 md:mt-0' />
            <button
              className='block px-3 py-1 mt-1 text-xl leading-none text-white bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer md:mt-0 lg:hidden focus:outline-none'
              type='button'
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <div className='icon-hamburger'>
                <div className='lines'></div>
              </div>
            </button>
          </div>
          <div className={'lg:flex flex-grow items-center' + (navbarOpen ? ' flex' : ' hidden')}>
            <ul
              className={`flex flex-col lg:flex-row list-none lg:ml-auto ${
                navbarOpen ? 'mb-8' : ''
              }`}
            >
              {menuItems
                ? menuItems.map((menu: MenuItem) => (
                    <li key={menu.text}>
                      <Link
                        href={menu.href}
                        className='block pt-4 pb-4 text-base font-normal text-white md:px-4 rounded-md'
                      >
                        {menu.text}
                      </Link>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
