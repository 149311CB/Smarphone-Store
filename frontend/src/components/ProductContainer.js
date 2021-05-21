import React, {useState, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getCart, addToCart, removeFromCart} from '../actions/CartActions'

const ProductContainer = ({ci, formatter}) => {
  const dispatch = useDispatch()
  const initialRender = useRef(true)
  const [quantity, setQuantity] = useState(ci.quantity)
  const reduceHandler = () => {
    // setQuantity(document.querySelector("#quantity-input").value - 1)
    const value = document.querySelector(`#quantity-input-${ci.product._id}`).value - 1;
    dispatch(removeFromCart({product: ci.product._id, quantity: value}))
    document.querySelector(`#quantity-input-${ci.product._id}`).value -= 1;
  }
  const plusHandler = () => {
    dispatch(addToCart({product: ci.product._id, quantity: 1}))
    const value = document.querySelector(`#quantity-input-${ci.product._id}`).value
    document.querySelector(`#quantity-input-${ci.product._id}`).value = parseInt(value) + 1;
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
            <button className="left-btn" onClick={e => reduceHandler(e)}>
              <i className="fas fa-minus" type="numbers"></i></button>
            <input id={`quantity-input-${ci.product._id}`} value={quantity} />
            <button className="right-btn" onClick={e => plusHandler(e)}> <i className="fas fa-plus"></i></button>
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
