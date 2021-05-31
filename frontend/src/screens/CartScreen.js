import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addToCart, getCart} from '../actions/CartActions'
import {getAddressByUserAction} from '../actions/AddressActions'
import ClipLoader from "react-spinners/ClipLoader";
import {Link} from 'react-router-dom'
import ProductContainer from '../components/carts/ProductContainer'
import ShippingContainer from '../components/ShippingContainer'

const CartScreen = () => {
  const dispatch = useDispatch()
  const {loading, error, cartInfo} = useSelector(state => state.getCart)
  const totalprice = Object.keys(cartInfo).length > 0
    ? cartInfo.products.reduce((acc, crr) => acc + crr.product.price * crr.quantity, 0) : 0

  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
    //These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  useEffect(() => {
    dispatch(getCart())
    dispatch(getAddressByUserAction())
  }, [dispatch])

  return (
    <>
      {
        loading || loading == null
          ? <div className="loader"><ClipLoader color={"#A7c080"} size={100} /></div>
          :
          <div className="cart-container">
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
                <Link to="/checkout" className="btn primary-btn lg" style={{display: "block", textAlign: "center"}}>Tiến hành thanh toán</Link>
              </div>
            </div >
          </div>
      }
    </>
  )
}

export default CartScreen
