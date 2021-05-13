import React from "react";
import {Link} from "react-router-dom";

const HeaderOptions = () => {
  const slideDown = () => {
    const elemnt = document.querySelector('.options-container')
    elemnt.classList.toggle('active')
  }
  return (
    <div>
      <div className="burger-btn" onClick={e => slideDown(e)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="options-container">
        <div className="header-options">
          <Link to="#cart">
            <i className="fas fa-shopping-cart"></i> GIỎ HÀNG
        </Link>
          <Link to="#user">
            <i className="fas fa-user"></i> ĐĂNG NHẬP
        </Link>
        </div>

      </div>
    </div>
  );
};

export default HeaderOptions;
