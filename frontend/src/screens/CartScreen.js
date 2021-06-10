import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addToCart, getCart} from '../actions/CartActions'
import {getAddressByUserAction} from '../actions/AddressActions'
import ClipLoader from "react-spinners/ClipLoader";
import {Link, useHistory} from 'react-router-dom'
import ProductContainer from '../components/carts/ProductContainer'
import ShippingContainer from '../components/ShippingContainer'
import OverlayMessages from "../components/OverlayMessages";

const CartScreen = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {loading, error, cartInfo} = useSelector(state => state.getCart)
  const {userInfo} = useSelector(state => state.userLogin)
  const totalprice = cartInfo != null && cartInfo.products != null && Object.keys(cartInfo).length > 0
    ? cartInfo.products.reduce((acc, crr) => acc + crr.product.price * crr.quantity, 0) : 0

  const [isOpen, setIsOpen] = useState(false);

  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
    //These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  const checkOutBegin=() =>{
      if(!userInfo){
        setIsOpen(true)
        dispatch({ type:"CHECKOUT_PENDING" })
        return null
      }
      history.push("/checkout")
  }
  useEffect(() => {
    dispatch(getCart())
    dispatch(getAddressByUserAction())
  }, [dispatch])

  return (
    <>
      {
        loading || loading == null
          ? <div className="loader"><ClipLoader color={"#A7c080"} size={100} /></div>
          : cartInfo == null || cartInfo.products == null || cartInfo.products.length === 0 ?
          <h2>Cart is empty</h2>
          :
          <div className="cart-container" style={{width:"100%"}}>
            <div className="product-list">
              <div style={{fontSize: "1rem", fontWeight: "500"}}>Giỏ Hàng</div>
              <div className="indicator" />
              {cartInfo.products.map(ci =>
                <>
                  <div className="product-container">
                    <ProductContainer ci={ci} formatter={formatter} />
                  </div>
                  <div className="indicator" />
                </>
              )}
            </div>
            <div className="">
              <ShippingContainer />
              <div className="coupon-group">
                <div>Mã khuyến mãi</div>
                <div className="show-coupons">
                  <img src="https://149311cbimages.s3.amazonaws.com/coupon(1).png" />
                  <span>Chọn hoặc nhập mã khuyến mãi</span>
                </div>
              </div>
              <div className="total-price">
                <h4>Thành tiền</h4>
                <div>{formatter.format(totalprice)}</div>
                <div className="indicator" />
                <button className="btn primary-btn lg"
                        style={{display: "block", textAlign: "center"}}
                        onClick={checkOutBegin}>Tiến hành thanh toán</button>
              </div>
            </div >
              <OverlayMessages img={"https://149311cbimages.s3.amazonaws.com/vault.svg"}
                               message={"You are not login yet! Please login to continue"}
                               body={"You are not login yet! Please login to continue"}
                               open={isOpen}
                               messageType={"danger"}
                               onClose={()=>setIsOpen(false)}>
                <button className={ "btn primary-btn lg"} onClick={() => history.push("/login")}>Continue</button>
              </OverlayMessages>
          </div>
      }
    </>
  )
}

export default CartScreen
