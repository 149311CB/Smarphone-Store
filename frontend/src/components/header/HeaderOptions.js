import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import {Link} from "react-router-dom";
import {logoutAction} from '../../actions/UserActions'

const HeaderOptions = () => {
  const dispatch = useDispatch()
  const slideDown = () => {
    const elemnt = document.querySelector('.options-container')
    elemnt.classList.toggle('active')
  }
  const showDropdown = (e) => {

    document.querySelector(".dropdown-box").classList.toggle("active")
  }
  const logoutHandler = () => {
    dispatch(logoutAction())
  }

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  return (
    <div>
      <div className="burger-btn" onClick={e => slideDown(e)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="options-container">
        <div className="header-options">
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i> GIỎ HÀNG
          </Link>
          {userInfo
            ?
            <div className="user-dropdown">
              <div id="user-name" className="noselect" onClick={showDropdown}> <i className="fas fa-user"></i> {userInfo.firstName.toUpperCase()}</div>
              <div className="dropdown-box">
                <ul>
                  <Link to="/profile"><li>Info</li></Link>
                  <li onClick={logoutHandler}>Logout</li>
                </ul>
              </div>
            </div>
            :
            (<Link to="/login">
              <i className="fas fa-user"></i> ĐĂNG NHẬP
            </Link>)
          }
        </div>

      </div>
    </div>
  );
};

export default HeaderOptions;
