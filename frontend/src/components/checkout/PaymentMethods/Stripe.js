import React from 'react'
import card from "../../../credit card.png";
import {CardElement, Elements, ElementsConsumer} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {completeOrder} from "../../../actions/OrderActions";

const stripePromise = loadStripe("pk_test_51Iwqe0KvZqrt4tRI0ZewUir13YIgFCeoaO9AQQb2w6a1Lu8AnWN2TypvEg4Q24xXXM8rL0BChZEjaIdx5FOYgVqQ0081tq7z3V")

const Stripe = ({method, changePaymentMethod,cartInfo,address}) => {
    const history =useHistory()
    const dispatch = useDispatch()
    const CARD_OPTIONS = {
        iconStyle: "solid",
        hidePostalCode:true,
        style: {
            base: {
                iconColor: "#c4f0ff",
                color: "#fff",
                fontWeight: 500,
                fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                fontSize: "16px",
                fontSmoothing: "antialiased",
                ":-webkit-autofill": { color: "#fce883" },
                "::placeholder": { color: "#87bbfd" }
            },
            invalid: {
                iconColor: "#ffc7ee",
                color: "#ffc7ee"
            }
        }
    }
  const handleStripeSubmit = async (e,elements,stripe) => {
      e.preventDefault()
        if(!stripe || !elements) return;
      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });
      if(error){
          history.push("/checkout/incomplete")
      }else{
          const order = {
              details: {
                  products: [...cartInfo.products]
              },
              order: {
                  status: "paid",
                  createdAt: new Date(paymentMethod.created).toISOString(),
                  gateway: "stripe",
                  paidInfo: `${paymentMethod.card.brand},${paymentMethod.card.last4}`,
                  shippingAddress: `${address.addressDetails}, ${address.ward}, ${address.district}, ${address.city}`,
                  shippingFee: 0
              }
          }
          dispatch(completeOrder(order))
      }
  }
  return (
    <div className="stripe-group" style={{marginBottom: "0.6rem"}}>
      <div className="radio-group">
        <input id="pay-with-card" type="radio" name="payment" value={2} onClick={e => changePaymentMethod(3)} />
        <label htmlFor="pay-with-card"><span style={{margin: "0 0.3rem"}}><img src={card} /></span> Thanh toán bằng thẻ tín dụng</label>
      </div>
      <div >
        {method === 3 ?
          <>
            <Elements stripe={stripePromise}>
              <ElementsConsumer>{({elements, stripe}) => (
                <form id="stripe-form" onSubmit={e => handleStripeSubmit(e, elements, stripe)}>
                    <fieldset className={"FormGroup"}>
                    <div className={"FormRow"}>
                        <CardElement options={CARD_OPTIONS}/>
                    </div>
                        {/*<button form="stripe-form" className="btn primary-btn lg"*/}
                        {/*        style={{marginTop: "0.6rem"}}*/}
                        {/*        disabled={!stripe}>ĐẶT MUA</button>*/}
                        <button disabled={!stripe}>ĐẶT MUA</button>
                    </fieldset>
                </form>
              )}</ElementsConsumer>
            </Elements>
          </>
          : ""
        }
      </div>
    </div>
  )
}

export default Stripe

