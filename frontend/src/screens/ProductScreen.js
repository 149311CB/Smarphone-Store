import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {productDetail} from '../actions/productActions'
import ProductContent from '../components/ProductContent'

const ProductScreen = ({match, history}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(productDetail(match.params.id))
  })

  return (
    <div className="product-details">
      <ProductContent />
    </div>
  )
}

export default ProductScreen

