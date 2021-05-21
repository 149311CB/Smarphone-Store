import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Card from './Card'
import {similarProducts} from '../actions/productActions'

const SimilarProducts = () => {
  const dispatch = useDispatch()
  const {loading, product} = useSelector(state => state.productDetail)
  const {error, similars} = useSelector(state => state.similars)
  useEffect(() => {
    if (typeof product != "undefined" && Object.keys(product).length > 0) {
      dispatch(similarProducts(product.manufactor))
    }
  }, [product])
  return (
    <>
      {
        loading != true && typeof similars != "undefined" && Object.keys(similars).length > 0 ?
          <div className="similar-products">
            <h4>Sản phẩm tương tự</h4>
            <div className="similar-row">
              {similars.map((s, index) => <Card id={s._id} name={s.name}
                ratings={s.ratings != "undefined" ? s.ratings : []}
                price={s.price} image={s.images[0]} keys={index} />)}
            </div>
          </div> : ""
      }
    </>
  )
}

export default SimilarProducts
