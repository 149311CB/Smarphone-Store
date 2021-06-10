import React, {useState, useRef, useEffect} from 'react'
import {useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {useClickOutside} from "../../hooks/clickOutside";
import {useClickOutsidev2} from "../../hooks/clickOutsidev2";

const ProfileDropdown = ({userInfo, logoutHandler}) => {
  const {visible, setVisible, ref} = useClickOutsidev2(false)

  const handleClick = () => {
    setVisible((prevState) => !prevState)
  }

  return (
    <>
      <div className="user-dropdown" onClick={e => handleClick()}>
        <div id="user-name" className="noselect">
          <i className="fas fa-user" /> {userInfo.firstName.toUpperCase()}
        </div>
        {visible ?
          <div ref={ref} className="dropdown-box">
            <ul>
              <Link to="/account/profile"><li>Info</li></Link>
              {userInfo.role === "admin" && <Link to="/admin"><li>Admin portal</li></Link>}
              <li onClick={logoutHandler}>Logout</li>
            </ul>
          </div>
          : ""}
      </div>
    </>
  )
}

export default ProfileDropdown

