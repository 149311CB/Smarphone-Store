import React from "react";
import {withRouter, Link} from 'react-router-dom'
import HeaderSearchBar from './HeaderSearchBar'
import HeaderOptions from "./HeaderOptions";

const Header = ({location}) => {
  const {pathname} = location;
  return (
    <header>
      <nav>
        <Link to="/">
          <div
            className="logo"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: "#A7C080",
            }}
          ></div>
        </Link>
        <div className={pathname === "/login" || pathname === "/register" ? "header-funtions hide-search" : "header-funtions"}>
          {pathname === "/login" || pathname === "/register" ? "" : <HeaderSearchBar />}
          <HeaderOptions />
        </div>
      </nav>
    </header>
  );
};

export default withRouter(Header);
