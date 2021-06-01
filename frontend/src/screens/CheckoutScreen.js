import React, {useEffect} from 'react'
import CheckoutSummary from '../components/checkout/CheckoutSummary'
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

const CheckoutScreen = () => {
  return (
    <div className="checkout-screen">
      <CheckoutSummary />
    </div>
  )
}

export default CheckoutScreen

