import React, {useEffect} from 'react'
import CheckoutSummary from '../components/checkout/CheckoutSummary'
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import AddressList from "../components/AddressList";
import AddAddress from "../components/AddAddress";
import ClipLoader from "react-spinners/ClipLoader";
import {PUSH_CART_RESET} from "../constants/CartConstants";
import EditAddress from "../components/EditAddress";
const CHECKOUT_STYLES = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start"
}
const CheckoutScreen = ({location, history}) => {

  const dispatch = useDispatch()
  const {loading, error, message} = useSelector(state => state.pushCart)
  const {cartInfo} = useSelector(state => state.getCart)
  const {userInfo} = useSelector(state => state.userLogin)

  useEffect(() => {
    dispatch({type: "CHECKOUT_NOT_PENDING"})
    dispatch({type: PUSH_CART_RESET})
  }, []);

  const {hash} = location
  if (userInfo == null || cartInfo == null) {
    history.push("/")
    return null
  }

  return (
    <div className="checkout-screen" style={CHECKOUT_STYLES}>
      <CheckoutSteps hash={hash} />
      <div className={"checkout-process"}
        style={{width: "100%", display: "flex", justifyContent: "center"}}>
        {
          hash === ""
            ?
            <CheckoutSummary />
            :
            hash === "#addresslist"
              ?
              <AddressList width={100} buttonsWidth={30}
                           flexContainer={{display:"flex",alignItems:"center", flexDirection:"column"}}
                           hideShipping={true}/>
              :
              hash === "#addaddress"
                ?
                <AddAddress />
                :
                  hash.includes("#editaddress")
            ?
                      <EditAddress />
                      :""

        }
      </div>
    </div>
  )
}

export default CheckoutScreen
