import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Cash from "./PaymentMethods/Cash";
import Paypal from "./PaymentMethods/Paypal";
import Stripe from "./PaymentMethods/Stripe";
import {CREATE_ORDER_RESET} from "../../constants/OrderConstants";

const PaymentMethods = ({amount, sdkReady, cartInfo}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [method, setMethod] = useState(0)
  const {address} = useSelector(state => state.getAddressByUser)
  const {loading, error, orderCreated} = useSelector(state => state.orderCreated)

  const changePaymentMethod = (m) => {
    setMethod(m)
  }

  useEffect(() => {
    if (orderCreated != null) {
      if (orderCreated.status === "paid" || orderCreated.status === "waiting to confirm") {
        history.push(`/checkout/complete/${orderCreated._id}`)
      } else {
        history.push(`/checkout/incomplete/${orderCreated._id}`)
      }
    }
  }, [orderCreated])

  return (
    <div className="payment-methods">
      <div style={{fontSize: "1rem", fontWeight: "500", marginBottom: "0.6rem"}}>Chọn hình thức thanh toán</div>
      <div className="payment-group">
        <Cash method={method} changePaymentMethod={changePaymentMethod}
          cartInfo={cartInfo} address={address} />
        <Paypal method={method} changePaymentMethod={changePaymentMethod}
          amount={amount} sdkReady={sdkReady} cartInfo={cartInfo}
          address={address} />
        <Stripe method={method} changePaymentMethod={changePaymentMethod}
          amount={amount} cartInfo={cartInfo}
          address={address} />
      </div>
    </div>
  )
}

export default PaymentMethods

