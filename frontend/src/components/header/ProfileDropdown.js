import React, {useState, useRef, useEffect} from 'react'
import {Link} from 'react-router-dom'

let useClickOutside = (handler) => {
  let domNode = useRef()
  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler()
      }
    }
    document.addEventListener("mousedown", maybeHandler)
    return () => {
      document.removeEventListener("mousedown", maybeHandler)
    }
  })
  return domNode
}

const ProfileDropdown = ({userInfo, logoutHandler}) => {
  const [isOpen, setIsOpen] = useState(false)

  const domNode = useClickOutside(() => {
    setIsOpen(false)
  })

  return (
    <>
      <div ref={domNode} className="user-dropdown" onClick={e => setIsOpen(!isOpen)}>
        <div id="user-name" className="noselect">
          <i className="fas fa-user"></i> {userInfo.firstName.toUpperCase()}
        </div>
        {isOpen ?
          <div className="dropdown-box">
            <ul>
              <Link to="/profile"><li>Info</li></Link>
              <li onClick={logoutHandler}>Logout</li>
            </ul>
          </div>
          : ""}
      </div>
    </>

  )
}

export default ProfileDropdown

