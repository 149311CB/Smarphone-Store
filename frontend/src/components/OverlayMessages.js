import React, {useState} from 'react'
import ReactDOM from "react-dom"

const OverlayMessages = ({children,img,header,body,message,messageType,open,onClose}) => {
  if(!open) return null
  const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    borderRadius: "0.3rem",
    backgroundColor: '#FFF',
    padding: "0.6rem",
    zIndex: 1000
  }
  const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .3)',
    zIndex: 1000
  }
  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES}/>
      <div className={"overlay-message"} style={MODAL_STYLES}>
        <div className={"image-container"}>{img ?<img src={img} alt={"message-image"}/>:""}</div>
          <div className={"main-message"}>
            <div className={"message-header"}>
              <button onClick={onClose} className={"btn light-btn transparent"}><i className="fas fa-times fa-lg"/></button>
              <p>{header}</p>
            </div>
            <div className={"message-body"}>
              <h3>{body}</h3>
              {children}
            </div>
          </div>
      </div>
    </>,
      document.getElementById('portal')
  )
}

export default OverlayMessages

