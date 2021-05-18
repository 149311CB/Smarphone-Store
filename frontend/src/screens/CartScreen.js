import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getCart} from '../actions/CartActions'

const CartScreen = () => {
  const dispatch = useDispatch()
  const {loading, error, cartInfo} = useSelector(state => state.getCart)
  {/*cartInfo.products.reduce((acc, crr) => acc.product.price + crr.product.price)*/}
  console.log(cartInfo)

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])

  return (
    <>
      {Object.keys(cartInfo).length ?
        <div className="cart-container">
          <div className="product-list">
            <div style={{fontSize: "1rem", fontWeight: "500"}}>Giỏ Hàng</div>
            <div className="indicator"></div>
            {cartInfo.products.map(ci =>
              <>
                <div className="product-container">
                  <div className="image-container">
                    <img src={ci.product.images[0]} />
                  </div>
                  <div className="product-details">
                    <div className="static">
                      <h3>{ci.product.name}</h3>
                      <div>{ci.product.price}</div>
                    </div>
                    <div className="options">
                      <div className="quantity-select">
                        <button className="left-btn"><i className="fas fa-minus"></i></button>
                        <input value={1} />
                        <button className="right-btn"> <i className="fas fa-plus"></i></button>
                      </div>
                      <div className="options-col">
                        <button>Xoá</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="indicator"></div>
              </>
            )}
          </div>
          <div className="shipping">
            <div className="shipping-row">
              <div>Địa chỉ nhận hàng</div>
              <div>Thay đổi</div>
            </div>
            <div className="shipping-row">
              <div>Nguyễn Hùng Vĩ | 0964574475</div>
              <div>Chung cư Đào Duy Từ, Thành Thái, Phường 14, Quận 10, Hồ Chí Minh</div>
            </div>
          </div>
          <div className="coupon-group">
            <div>Mã khuyến mãi</div>
            <div className="show-coupons">
              <img src="https://149311cbimages.s3.amazonaws.com/coupon(1).png" />
              <span>Chọn hoặc nhập mã khuyến mãi</span>
            </div>
          </div>
          <div className="total-price">
            {}
          </div>
        </div> : ""
      }
    </>
  )
}

export default CartScreen
