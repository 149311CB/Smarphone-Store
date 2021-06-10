import React from 'react'
import {Link} from "react-router-dom";

const AdminSidebar = ({active}) => {
  return (
    <div className={"admin-sidebar"}>
      <ul className={"account-options"}>
        <li className={active === "users" ?"noselect active" : "noselect"}>
          <Link to={"/admin/users"}>
            Quản lý người dùng
          </Link>
        </li>
        <li className={active === "orders" ? "noselect active center" : "noselect center"}>
          <Link to={"/admin/orders"}>
            Quản lý đơn hàng
          </Link>
        </li>
        <li className={active === "products" ? "noselect active center" :"noselect center"}>
          <Link to={"/admin/products"}>
            Quản lý sản phẩm
          </Link>
        </li>
        <li className={active === "favorites" ? "noselect active" :"noselect"}>
          <Link to={"/account/discounts"}>
            Quản lý mã khuyến mãi
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default AdminSidebar

