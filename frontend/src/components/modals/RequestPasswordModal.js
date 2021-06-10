import React, {useState} from 'react'
import * as ReactDOM from "react-dom";
const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "20%",
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
const RequestPasswordModal = ({onSubmitPassword, onClose}) => {
    const [password, setPassword] = useState("");
    return ReactDOM.createPortal(
      <>
          <div style={OVERLAY_STYLES} onClick={onClose}/>
          <div style={MODAL_STYLES} >
              <button onClick={onClose} className={"btn light-btn transparent"} style={CLOSE_BUTTON}>
                  <i className="fas fa-times fa-lg"/>
              </button>
            <form onSubmit={e =>onSubmitPassword(e,password)} style={{marginTop:"2.4rem", fontSize:"0.813rem"}}>
                <div className={"form-group"}
                     style={{display:"flex",flexDirection:"column",
                         marginBottom:"1.2rem"}}>
                    <label htmlFor={"password-request"}>Mật khẩu xác nhận</label>
                    <input id="password-request" type={"password"} onChange={e =>setPassword(e.target.value)}/>
                </div>
                <button className={"btn primary-btn nm"} >Xác nhận</button>
            </form>
        </div>
      </>,
      document.getElementById("portal")
  )
}

export default RequestPasswordModal