import React from "react";
import { Link } from "react-router-dom";

const HeaderOptions = () => {
  return (
    <div className="header-options">
      <Link>
        <i class="fas fa-shopping-cart"></i> GIỎ HÀNG
      </Link>
      <Link>
        <i class="fas fa-user"></i> ĐĂNG NHẬP
      </Link>
    </div>
  );
};

export default HeaderOptions;
