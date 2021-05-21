import React, {useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {productDetail} from '../actions/productActions'
import ProductContent from '../components/ProductContent'
import SimilarProducts from '../components/SimilarProducts'
import ProductSpecification from '../components/ProductSpecification'
import ProductRatings from '../components/ProductRatings'

const ProductScreen = ({match}) => {
  const dispatch = useDispatch()

  dispatch(productDetail(match.params.id))
  return (
    <>
      <div className="product-details">
        <ProductContent />
        <SimilarProducts />
        <ProductSpecification />
        <ProductRatings />
      </div>
    </>
  )
}

export default ProductScreen

