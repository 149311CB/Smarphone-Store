import React, {useEffect, useState} from 'react'
import paypal from "../../../paypal 2.png";
import {PayPalButton} from "react-paypal-button-v2";
import axios from "axios";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {completeOrder} from "../../../actions/OrderActions";

const Paypal = ({sdkReady, method, changePaymentMethod, amount, cartInfo, address}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [usdAmount, setUsdAmount] = useState(0)

  const paypalSubmitHandler = (paymentResult) => {
      const order = {
        details: {
          products: [...cartInfo.products]
        },
        order: {
          status: paymentResult.status === "COMPLETED" ? "paid" : "payment fail",
          createdAt: paymentResult.create_time,
          gateway: "paypal",
          paidInfo: paymentResult.payer.email_address,
          shippingAddress: `${address.addressDetails}, ${address.ward}, ${address.district}, ${address.city}`,
          shippingFee: 0
        }
      }
      dispatch(completeOrder(order))
  }
  useEffect(() => {
    const paypalMethod = async (input) => {
      if (amount) {
        const {data} = await axios.get("https://openexchangerates.org/api/latest.json?app_id=4fe725f639924ae7907052a3d4191100")
        setUsdAmount(Math.round(amount / data.rates.VND))
      }
    }
    if (method === 1) {
      paypalMethod()
    }
  }, [method]);

  return (
    <div className="paypal-group" style={{marginBottom: "0.6rem"}}>
      <div className="radio-group">
        <input id="pay-with-paypal" type="radio" name="payment" value={1} onClick={e => changePaymentMethod(1)} />
        <label htmlFor="pay-with-paypal"><span style={{margin: "0 0.3rem"}}><img src={paypal}  alt={"paypal-icon"}/></span> Thanh toán bằng paypal</label>
      </div>
      {method === 1 ?
        <div style={{width: "35%"}}>
          {!sdkReady
            ? ""
            : <PayPalButton
              amount={usdAmount}
              onSuccess={paypalSubmitHandler}
              shippingPreference="NO_SHIPPING"
              disableCard
              disableFunding
              style={{
                layout: 'horizontal',
                tagline: 'false'
              }}
            />}
        </div>
        : ""
      }
    </div>
  )
}

export default Paypal

