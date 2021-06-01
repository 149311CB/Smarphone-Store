import React, {useEffect} from 'react'
import acceptOrder from "../accept-order 1.png"
import {Link, useHistory} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";

const CheckoutComplete = () => {
    const history = useHistory()
  const {orderCreated} =  useSelector(state => state.orderCreated)

    if(orderCreated == null){
        history.push("/")
        return null
    }
  return (
    <div className="checkout-complete" style={{ lineHeight:"2rem", display:"flex", alignItems:"center", justifyContent:"space-between", width:"50%" }}>
      <img src={acceptOrder}/>
        <div>
            <h3 style={{ fontWeight:"500" }}>Cảm ơn bạn đã mua hàng tại SM</h3>
            <div style={{fontSize:"0.813rem"}}>
                <p>Mã số đơn hàng của bạn: {orderCreated._id}</p>
                <div>
                    Bạn có thể xem lại tại <Link to={"/account/orders"} style={{color:"#458588"}}>Đơn hàng của tôi.</Link>
                </div>
                <div style={{fontWeight:"500px",marginTop:"1.2rem"}}>
                <Link to={"/"} className={"btn primary-btn lg"} >Tiếp tục mua sắm</Link>
                </div>
            </div>
        </div>
    </div >
  )
}

export default CheckoutComplete

