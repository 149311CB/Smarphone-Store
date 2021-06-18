import React, {useState, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {updateQty } from '../../actions/CartActions'
import {removeFromCart} from "../../actions/CartActions"

const ProductContainer = ({ci, formatter}) => {
  const dispatch = useDispatch()
  const initialRender = useRef(true)
  const [quantity, setQuantity] = useState(ci.quantity)
  const reduceHandler = () => {
    const value = document.querySelector(`#quantity-input-${ci.product._id}`).value - 1;
    setQuantity(value)
    dispatch(updateQty({product: ci.product._id, quantity: value}))
  }
  const plusHandler = () => {
    const value = parseInt(document.querySelector(`#quantity-input-${ci.product._id}`).value) + 1
    setQuantity(value)
    dispatch(updateQty({product: ci.product._id, quantity: value}))
  }
  const deleteHandler = () => {
    dispatch(removeFromCart({product: ci.product._id}))
  }

  return (
    <>
      <div className="image-container">
        <img src={ci.product.images[0]} />
      </div>
      <div className="product-details">
        <div className="static">
          <h3>{ci.product.name}</h3>
          <div>{formatter.format(ci.product.price)}</div>
        </div>
        <div className="options">
          <div className="quantity-select">
            <button className="left-btn" onClick={e => reduceHandler(e)} disabled={quantity <=1 ? "disabled":""}>
              <i className="fas fa-minus"/></button>
            <input id={`quantity-input-${ci.product._id}`} value={quantity} readOnly/>
            <button className="right-btn" onClick={e =>  plusHandler(e)} disabled={quantity >=3 ? "disabled":""}>
              <i className="fas fa-plus"/>
            </button>
          </div>
          <div className="options-col">
            <button onClick={e => deleteHandler(e)}>Xoá</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductContainer
