import React, {useState, useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Rating from '../Rating'
import ProgressBar from '../ProgressBar'
import AddRating from '../AddRating'
import {getUserRatingAction} from "../../actions/UserActions";

const ProductRatings = () => {
  const dispatch = useDispatch()
  const {product} = useSelector(state => state.productDetail)
  const {userInfo} = useSelector(state => state.userLogin)
  const {userRating} = useSelector(state => state.getUserRating)
  const [isOpen, setIsOpen] = useState(false)
  const {reviews} = product

  let fiveStar = 0;
  let fourStar = 0;
  let threeStar = 0;
  let twoStar = 0;
  let oneStar = 0;

  if (product != "undefined" && Object.keys(product).length > 0) {
    const newFilter = reviews.filter(r =>
      r.rating === 5 ? fiveStar += 1
        : r.rating >= 4 && r.rating < 5 ? fourStar += 1
          : r.rating >= 3 && r.rating < 4 ? threeStar += 1
            : r.rating >= 2 && r.rating < 3 ? twoStar += 1
              : r.rating >= 1 && r.rating < 2 ? oneStar += 1 : 0).length
  }

  useEffect(() => {
    const elemnt = document.getElementById("add-rating-btn")
    if (elemnt) {
      let display=true
      reviews.map(r =>{
        if(userInfo != null && r.user._id === userInfo._id){
          elemnt.style.display="none"
          display=false
        }
      })
      if(display){
        dispatch(getUserRatingAction(product._id))
      }
    }
  },[product])

  if (reviews == null) {
    return null;
  }

  return (
    <>
      {reviews ?
        < div className="product-ratings">
          <h4>Đánh giá sản phẩm</h4>
          <div className="ratings-list">
            <div className="ratings-summary">
              <div className="rating-group">
                <Rating value={5} />
                <ProgressBar value={fiveStar} summary={reviews.length} />
                <span>{fiveStar}</span>
              </div>
              <div className="rating-group">
                <Rating value={4} />
                <ProgressBar value={fourStar} summary={reviews.length} />
                <span>{fourStar}</span>
              </div>
              <div className="rating-group">
                <Rating value={3} />
                <ProgressBar value={threeStar} summary={reviews.length} />
                <span>{threeStar}</span>
              </div>
              <div className="rating-group">
                <Rating value={2} />
                <ProgressBar value={twoStar} summary={reviews.length} />
                <span>{twoStar}</span>
              </div>
              <div className="rating-group">
                <Rating value={1} />
                <ProgressBar value={oneStar} summary={reviews.length} />
                <span>{oneStar}</span>
              </div>
              <button onClick={() => setIsOpen(true)} id="add-rating-btn">Viết nhận xét</button>
              <AddRating image={product.images[0]} id={product._id} name={product.name} open={isOpen} onClose={() => setIsOpen(false)}/>
            </div>
            <div className="ratings-details">
              {reviews.map(r =>
                <div>
                  <div className="user-rating">
                    <div className="profile-picture"/>
                    <div>
                      <div>
                        <p className="user-name">{r.user.lastName + " " + r.user.firstName}</p>
                        <Rating value={r.rating} text={r.rating} />
                      </div>
                      <p style={{marginTop: "0.6rem"}}>{r.comment}</p>
                    </div>
                  </div>
                  <div className="indicator"/>
                </div>)}
            </div>
          </div>
        </div> : ""
      }
    </>
  )
}

export default ProductRatings
