import React, {useImperativeHandle} from 'react'
import {useClickOutsidev2} from "../../hooks/clickOutsidev2";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

const MODAL_STYLES = {
  position: 'absolute',
  top: '16vh',
  right: '-10%',
  transform: 'translate(-50%, -50%)',
  width: "20%",
  // minHeight: "10%",
  borderRadius: "0.3rem",
  backgroundColor: '#FFF',
  padding: "0.6rem",
  zIndex: 1000,
  background: "#323d43",
  boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.1), 0px 0px 1.2px rgba(0, 0, 0, 0.1)",
  color: "#a7c080",
  fontSize:"0.813rem"

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

const AddToCartModal = ({childRef}) => {
  const history = useHistory()
  const {visible,setVisible,ref} = useClickOutsidev2(false)
  useImperativeHandle(childRef,() =>({
    // setVisible(true)
    visibleNow(){
        setVisible(true)
    }
  }))
  // const dispatch = useDispatch()
  return (
    <>
      {
        visible &&
        <div ref={ref} className="add-to-cart-modal" style={MODAL_STYLES}>
          <div >
            Thêm vào giỏ hàng thành công
          </div>
          <button className={"btn primary-btn lg"}
                  style={{width:"100%", marginTop:"0.6rem"}}
                  onClick={() => history.push("/cart")}>Xem giỏ hàng</button>
        </div>
      }
      {/*<button onClick={()=>setVisible(true)}>Click me</button>*/}
    </>
  )
}

export default AddToCartModal
