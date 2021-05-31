import React from 'react'
import card from "../../../credit card.png";
import {CardElement, Elements, ElementsConsumer} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {useSelector} from "react-redux";

const stripePromise = loadStripe("pk_test_51Iwqe0KvZqrt4tRI0ZewUir13YIgFCeoaO9AQQb2w6a1Lu8AnWN2TypvEg4Q24xXXM8rL0BChZEjaIdx5FOYgVqQ0081tq7z3V")
const Stripe = ({method, changePaymentMethod}) => {

  const handleStripeSubmit = () => {

  }
  return (
    <div className="stripe-group" style={{marginBottom: "0.6rem"}}>
      <div className="radio-group">
        <input id="pay-with-card" type="radio" name="payment" value={2} onClick={e => changePaymentMethod(3)} />
        <label htmlFor="pay-with-card"><span style={{margin: "0 0.3rem"}}><img src={card} /></span> Thanh toán bằng thẻ tín dụng</label>
      </div>
      <div style={{width: "50%"}}>
        {method === 3 ?
          <>
            <Elements stripe={stripePromise}>
              <ElementsConsumer>{({elements, stripe}) => (
                <form id="stripe-form" onSubmit={e => handleStripeSubmit(e, elements, stripe)}>
                  <CardElement />
                </form>
              )}</ElementsConsumer>
            </Elements>
            <button form="stripe-form" className="btn primary-btn lg" style={{marginTop: "0.6rem"}}>ĐẶT MUA</button>
          </>
          : ""
        }
      </div>
    </div>
  )
}

export default Stripe

