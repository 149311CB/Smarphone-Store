import React from "react";
import Button from "../components/Button";

const HeaderSearchBar = () => {
  return (
    <div className="header-searchbar">
      <Button text="DANH MỤC SẢN PHẨM" textAlign="left" />
      <form className="search-form">
        <input
          type="text"
          style={{
            border: "none",
            outline: "none",
            padding: "0.9rem 0.6rem",
          }}
        />
      </form>
      <Button text="TÌM KIẾM" border="1px solid #a7c080" />
    </div>
  );
};

export default HeaderSearchBar;
