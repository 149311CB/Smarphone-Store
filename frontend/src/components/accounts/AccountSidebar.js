import React from 'react'
import {Link} from "react-router-dom";

const AccountSidebar = ({active}) => {
  return (
  <div className={"account-sidebar"} style={{width:"230px"}}>
    <ul className={"account-options"}>
      <li className={active === "profile" ?"noselect active" : "noselect"}>
        <Link to={"/account/profile"}>
          Thông tin tài khoản
        </Link>
      </li>
      <li className={active === "orders" ? "noselect active center" : "noselect center"}>
        <Link to={"/account/orders"}>
          Quản lý đơn hàng
        </Link>
      </li>
      <li className={active === "addresses" ? "noselect active center" :"noselect center"}>
        <Link to={"/account/addresses"}>
          Sổ địa chỉ
        </Link>
      </li>
      <li className={active === "favorites" ? "noselect active" :"noselect"}>
        <Link to={"/account/favorite"}>
          Sản phẩm yêu thích
        </Link>
      </li>
    </ul>
  </div>
  )
}

export default AccountSidebar

