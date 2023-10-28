import React from "react";
import Container from "@components/container";
import NavBar from "./nav";

const Header = () => (
  <header className="top-0 z-10 flex flex-none bg-purple">
    <Container>
      <NavBar position={"relative"} />
    </Container>
  </header>
);

export default Header;
