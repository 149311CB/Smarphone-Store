import React from "react";
import { Link } from "react-router-dom";

const HeaderOptions = () => {
  return (
    <div className="header-options">
      <Link to="#cart">
        <i className="fas fa-shopping-cart"></i> GIỎ HÀNG
      </Link>
      <Link to="#user">
        <i className="fas fa-user"></i> ĐĂNG NHẬP
      </Link>
    </div>
  );
};

export default HeaderOptions;
