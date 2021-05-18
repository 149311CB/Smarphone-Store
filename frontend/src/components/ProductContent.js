import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Rating from './Rating'
import ProductOptions from './ProductOptions'
import {addToCart} from '../actions/CartActions'


const ProductContent = () => {
  const dispatch = useDispatch()
  const {loading, error, product} = useSelector(state => state.productDetail)
  product ? console.log(product._id) : console.log(null)

  const [mainImage, setMainImage] = useState("")
  const [quantity, setQuantity] = useState(1)
  const rating = Object.keys(product).length !== 0 ? product.ratings.reduce((acc, curr) => acc + curr.rating, 0) : 0

  const changeMainImage = (i) => {
    setMainImage(i)
  }

  const changeQuantity = (qty) => {
    setQuantity(qty)
  }

  {/* const changeCoupon = (c, e) => {
    const couponGroup = Array.from(document.querySelectorAll(".coupon-group div.active"))
    const couponBall = Array.from(document.querySelectorAll(".coupon-group .coupon-ball"))
    if (c === coupon) {
      setPrice(product.price);
      couponGroup.map(cg => cg.classList.remove("active"))
      setCoupon("")
      couponBall.map(cb => cb.style.border = "")
      return;
    } else if (c.discountType === "fixed") {
      setPrice(product.price - c.discountAmount);
    } else {
      setPrice((price * c.discountPercent) / 100)
    }
    couponGroup.map(cg => cg.classList.remove("active"))
    e.target.classList.add("active")
    couponBall.map(cb => cb.style.border = "none")
    setCoupon(c)
  } */}

  const addToCartHandler = (e) => {
    dispatch(addToCart({product: product._id, quantity: quantity}))
  }

  return (
    <>
      {
        Object.keys(product).length !== 0 ? <div className="product-content-container" >
          <div className="product-image">
            <img src={mainImage ? mainImage : product.images[0]} alt={"main-image"} />
            <div className="small-images">
              {product.images.length === 1 ? <img src="/phone.svg" /> :
                product.images.map(i => <img src={i} onClick={e => changeMainImage(i)} />)
              }
            </div>
          </div>

          <div className="product-title">
            <h2>{product.name}</h2>
            <Rating text={`(${product.ratings.length})`} value={rating / product.ratings.length} />
          </div>

          <div className="product-options" >
            <ProductOptions
              price={product.price}
              rom={product.rom}
              ram={product.ram}
              quantity={quantity}
              coupons={product.coupons}
              changeQuantity={changeQuantity} />
          </div>

          <div className="product-submit" >
            <ul>
              <li>Tình trạng: </li>
              <li className="warranty-detail">
                <p>Hình thức bảo hành: {product.warranty.warrantyType}</p>
                <p>Thời gian bảo hành: {product.warranty.time} Tháng</p>
              </li>
              <li><i className="fas fa-map-marked-alt"></i> Địa chỉ:</li>
              <li className="btn-container" onClick={e => addToCart(e)}>
                <button className="buy-btn">MUA NGAY</button>
              </li>
              <li className="btn-container">
                <button className="add-to-card-btn" onClick={addToCartHandler}>THÊM VÀO GIỎ HÀNG</button>
              </li>
            </ul>
          </div>
        </div > : ""
      }
    </>
  )
}

export default ProductContent
