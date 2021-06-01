import React from 'react'
import cash from "../../../pay 1.png";
import {completeOrder} from "../../../actions/OrderActions";
import {useDispatch} from "react-redux";

const Cash = ({method,changePaymentMethod,cartInfo,address}) => {
    const dispatch = useDispatch()
    const cashSubmitHandler=() =>{
        const order ={
            details:{
                products:[...cartInfo.products]
            },
            order:{
                status:"waiting to confirm",
                createdAt:new Date().toISOString(),
                gateway: "none",
                paidInfo:"cash",
                shippingAddress:`${address.addressDetails}, ${address.ward}, ${address.district}, ${address.city}`,
                shippingFee: 0
            }
        }
        dispatch(completeOrder(order))
    }
  return (
      <div className="cash-group" style={{marginBottom: "0.6rem"}}>
        <div className="radio-group">
          <input id="pay-with-cash" type="radio" name="payment" value={0} onClick={e => changePaymentMethod(0)} checked={method === 0 ? "checked":""}/>
          <label htmlFor="pay-with-cash"><span style={{margin: "0 0.3rem"}}><img src={cash} /></span>Thanh toán tiền mặt khi nhận hàng</label>
        </div>
        {method === 0
            ? <button className="btn primary-btn lg"
                      style={{marginBottom: "0.6rem"}}
                      onClick={cashSubmitHandler}>ĐẶT MUA</button> : ""}
      </div>
  )
}

export default Cash

