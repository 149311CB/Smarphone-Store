import React from "react";
import HeaderSearchBar from './HeaderSearchBar'
import HeaderOptions from "./HeaderOptions";

const Header = () => {
  return (
    <header>
      <nav>
        <div
          className="logo"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "#A7C080",
          }}
        ></div>
        <div className="header-funtions">
          <HeaderSearchBar />
          <HeaderOptions />
        </div>
      </nav>
    </header>
  );
};

export default Header;
