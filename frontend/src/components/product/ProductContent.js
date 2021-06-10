import React, {useState, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Rating from '../Rating'
import ProductOptions from './ProductOptions'
import ClipLoader from "react-spinners/ClipLoader";
import {addToCart} from '../../actions/CartActions'
import Alert from "../Alert";
import OverlayMessages from "../OverlayMessages";
import {useHistory} from "react-router-dom";
import AddToCartModal from "../modals/AddToCartModal";

const ProductContent = () => {

  const dispatch = useDispatch()
  const history= useHistory()
  const childRef=useRef()
  const {loading, error, product} = useSelector(state => state.productDetail)
  const {userInfo} = useSelector(state => state.userLogin)

  const [mainImage, setMainImage] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isOpen, setIsOpen] = useState(false);
  const rating = product != null  && Object.keys(product).length !== 0
    ? product.reviews.reduce((acc, curr) => acc + curr.rating, 0) : 0

  const changeMainImage = (i) => {
    setMainImage(i)
  }

  const changeQuantity = (qty) => {
    if(qty > product.countInStock || qty > 3){
      return
    }
    setQuantity(qty)
  }

  const addToCartHandler = (e) => {
    childRef.current.visibleNow()
    dispatch(addToCart({product: product._id, quantity: quantity}))
  }

  const checkOutBegin=() =>{
    dispatch(addToCart({product: product._id, quantity: quantity}))
    if(!userInfo){
      setIsOpen(true)
      dispatch({ type:"CHECKOUT_PENDING" })
      return null
    }
    history.push("/checkout")
  }

  return (
    <>
      {
        loading ? <div className="loader"><ClipLoader color={"#A7c080"} size={100} /></div> :
          <div className="product-content-container" >
              <AddToCartModal childRef={childRef}/>
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
              <Rating text={`(${product.reviews.length})`}
                value={rating / product.reviews.length} />
            </div>

            <div className="product-options" >
              <ProductOptions
                price={product.price}
                rom={product.rom}
                ram={product.ram}
                quantity={quantity}
                changeQuantity={changeQuantity} />
            </div>

            <div className="product-submit" >
              <OverlayMessages img={"https://149311cbimages.s3.amazonaws.com/vault.svg"}
                               message={"You are not login yet! Please login to continue"}
                               body={"You are not login yet! Please login to continue"}
                               open={isOpen}
                               messageType={"danger"}
                               onClose={()=>setIsOpen(false)}>
                <button className={ "btn primary-btn lg"} onClick={() => history.push("/login")}>Continue</button>
              </OverlayMessages>
                <ul>
                  <li>Tình trạng: </li>
                <li className="warranty-detail">
                  <p>Hình thức bảo hành: {product.warranty.warrantyType}</p>
                  <p>Thời gian bảo hành: {product.warranty.time} Tháng</p>
                </li>
                <li className="btn-container" >
                  {/* onClick={e => addToCart(e)}>*/}
                  <button className="buy-btn" onClick={checkOutBegin}>MUA NGAY</button>
                </li>
                <li className="btn-container">
                  <button className="add-to-card-btn" onClick={addToCartHandler}>THÊM VÀO GIỎ HÀNG</button>
                </li>
              </ul>
            </div>
          </div >
      }
    </>
  )
}

export default ProductContent
