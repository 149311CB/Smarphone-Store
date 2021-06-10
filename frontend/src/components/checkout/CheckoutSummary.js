import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getCart, pushCartToServer} from '../../actions/CartActions'
import {getAddressByUserAction} from '../../actions/AddressActions'
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import CheckoutProducts from './CheckoutProducts'
import ShippingContainer from '../ShippingContainer'
import PaymentMethods from './PaymentMethods'
import {useHistory} from "react-router-dom";

const CheckoutSummary = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [sdkReady, setSdkReady] = useState(false)
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const {loading:pushLoading,error:pushError,message:pushMessage} = useSelector(state => state.pushCart)
  const {loading, error, cartInfo} = useSelector(state => state.getCart)
  const {loading:payLoading, error:payError} = useSelector(state => state.orderCreated)
    const {userInfo} = useSelector(state => state.userLogin)

  let amount = 0;

  if (cartInfo != null && cartInfo.products) {
    amount = cartInfo.products.reduce((acc, curr) => acc + curr.product.price, 0)
  }

  useEffect(() => {
    const addPaypalScript = async () => {
      const {data: clientId} = await axios.get("/api/config/paypal")
      const script = document.createElement('script')
      script.type = "text/javascript"
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!loading && !window.paypal && cartInfo) {
      addPaypalScript()
    } else {
      setSdkReady(true)
    }

    if(userInfo){
        dispatch(getCart())
        dispatch(getAddressByUserAction())
    }

  }, [dispatch,pushMessage])

  return (
    <>
      {payLoading || loading || loading == null
        ?
        <div className="loader">
            <ClipLoader color={"#A7c080"} size={100} />
        </div>
        :
        <div style={{width: "100%"}}>
          <div style={{fontSize: "1rem", fontWeight: "500", marginBottom: "0.6rem"}}>Danh sách sản phẩm</div>
          <div className="checkout-summary">
            <div className="left-col">
              <CheckoutProducts cartInfo={cartInfo} />
              <PaymentMethods paymentProccessing={e => setPaymentProcessing(true)} amount={amount} sdkReady={sdkReady} cartInfo={cartInfo} />
            </div>
            <div className="right-col">
              <ShippingContainer />
            </div>
          </div>
        </div>}
    </>
  )
}

export default CheckoutSummary
