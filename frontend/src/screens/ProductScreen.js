import React, {useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {productDetail} from '../actions/productActions'
import ProductContent from '../components/product/ProductContent'
import SimilarProducts from '../components/product/SimilarProducts'
import ProductSpecification from '../components/product/ProductSpecification'
import ProductRatings from '../components/product/ProductRatings'

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

