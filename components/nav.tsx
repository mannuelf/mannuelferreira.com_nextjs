import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { MenuItem, NavProps } from "./nav.types";
import menuItems from "./nav.data";

const NavBar = ({ position }: NavProps) => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  useEffect(() => setNavbarOpen(false), []);

  return (
    <>
      <nav
        className={`${position} flex flex-wrap items-center justify-between pt-2 pb-2 md:pt-1 md:pb-1`}
      >
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <div className="relative flex items-center justify-between w-full lg:w-auto lg:static lg:block lg:justify-start">
            <Logo customClass="grow-none" />
            <button
              className="block text-xl leading-none text-white bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
              title="open nav"
            >
              <div className="icon-hamburger">
                <div className="lines"></div>
              </div>
            </button>
          </div>
          <div
            className={"flex lg:flex flex-grow items-center" + (navbarOpen ? " flex" : " hidden")}
          >
            <ul
              className={`flex flex-col lg:flex-row list-none lg:ml-auto ${
                navbarOpen ? "mt-4 mb-4" : ""
              }`}
            >
              {menuItems
                ? menuItems.map((menu: MenuItem) => (
                    <li key={menu.text}>
                      <Link
                        href={menu.href}
                        className="block text-base font-normal text-white p-1 md:p-2"
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
