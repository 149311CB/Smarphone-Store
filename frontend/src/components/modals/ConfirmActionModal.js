import React from 'react'
import * as ReactDOM from "react-dom";

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "25%",
  minHeight: "20%",
  borderRadius: "0.3rem",
  backgroundColor: '#FFF',
  padding: "0.6rem",
  zIndex: 1000,
  display:"flex",
  justifyContent:"center"
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
const CLOSE_BUTTON ={
  position:"absolute",
  right:"0.6rem"
}

const ConfirmActionModal = ({confirm,action,type,color,onConfirm,onClose,go}) => {
  return ReactDOM.createPortal(
      <>
      <div style={OVERLAY_STYLES} onClick={onClose}/>
  <div className={"confirm-action-modal"} style={MODAL_STYLES}>
    <button onClick={onClose} className={"btn light-btn transparent"} style={CLOSE_BUTTON}>
      <i className="fas fa-times fa-lg"/>
    </button>
      <div style={{width:"100%"}}>
        <h3 style={{fontWeight:"500", margin:"1.2rem 0"}}>{confirm && "Bạn có chắc chắn muốn"} {action} ?</h3>
        <button className={`btn ${type}-btn lg ${color}`}
                style={{display:"block", width:"100%",fontWeight:"500"}}
                onClick={onConfirm}>{go}</button>
      </div>
    </div>
      </>,
  document.getElementById("portal")
)
}

export default ConfirmActionModal
