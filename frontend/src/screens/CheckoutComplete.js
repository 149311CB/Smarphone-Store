import React, {useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {CREATE_ORDER_RESET} from '../constants/OrderConstants'
import acceptOrder from '../accept-order 1.png'

const CheckoutComplete = ({match}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({type: CREATE_ORDER_RESET})
  })

  if (match.params.id == null) {
    return null
  }

  return (
    <>
      <div className="checkout-complete" style={{lineHeight: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between", width: "50%"}}>
        <img src={acceptOrder} />
        <div>
          <h3 style={{fontWeight: "500"}}>Cảm ơn bạn đã mua hàng tại SM</h3>
          <div style={{fontSize: "0.813rem"}}>
            <p>Mã số đơn hàng của bạn: {match.params.id}</p>
            <div>
              Bạn có thể xem lại tại <Link to={"/account/orders"} style={{color: "#458588"}}>Đơn hàng của tôi.</Link>
            </div>
            <div style={{fontWeight: "500px", marginTop: "1.2rem"}}>
              <Link to={"/"} className={"btn primary-btn lg"} >Tiếp tục mua sắm</Link>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default CheckoutComplete

