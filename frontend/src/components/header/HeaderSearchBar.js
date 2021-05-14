import React from "react";
import Button from "../Button";

const HeaderSearchBar = () => {
  return (
    <div className="header-searchbar">
      <Button text="DANH MỤC SẢN PHẨM" textAlign="left" width="100px" />
      <form className="search-form">
        <input
          type="text" />
      </form>
      <Button text="TÌM KIẾM" border="1px solid #a7c080" />
    </div>
  );
};

export default HeaderSearchBar;
