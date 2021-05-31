import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import Rating from '../Rating'
import ProgressBar from '../ProgressBar'
import AddRating from '../AddRating'

const ProductRatings = () => {
  const {product} = useSelector(state => state.productDetail)
  const [isOpen, setIsOpen] = useState(false)
  const {ratings} = product
  console.log(ratings)

  let fiveStar = 0;
  let fourStar = 0;
  let threeStar = 0;
  let twoStar = 0;
  let oneStar = 0;
  const localUser = JSON.parse(localStorage.getItem("userInfo"))

  if (product != "undefined" && Object.keys(product).length > 0) {
    const newFilter = ratings.filter(r =>
      r.rating === 5 ? fiveStar += 1
        : r.rating >= 4 && r.rating < 5 ? fourStar += 1
          : r.rating >= 3 && r.rating < 4 ? threeStar += 1
            : r.rating >= 2 && r.rating < 3 ? twoStar += 1
              : r.rating >= 1 && r.rating < 2 ? oneStar += 1 : 0).length
  }

  useEffect(() => {
    const elemnt = document.getElementById("add-rating-btn")
    if (elemnt) {
      elemnt.style.display = "none"
    }
  })
  if (ratings == null) {
    return null;
  }

  return (
    <>
      {ratings ?
        < div className="product-ratings">
          <h4>Đánh giá sản phẩm</h4>
          <div className="ratings-list">
            <div className="ratings-summary">
              <div className="rating-group">
                <Rating value={5} />
                <ProgressBar value={fiveStar} summary={ratings.length} />
                <span>{fiveStar}</span>
              </div>
              <div className="rating-group">
                <Rating value={4} />
                <ProgressBar value={fourStar} summary={ratings.length} />
                <span>{fourStar}</span>
              </div>
              <div className="rating-group">
                <Rating value={3} />
                <ProgressBar value={threeStar} summary={ratings.length} />
                <span>{threeStar}</span>
              </div>
              <div className="rating-group">
                <Rating value={2} />
                <ProgressBar value={twoStar} summary={ratings.length} />
                <span>{twoStar}</span>
              </div>
              <div className="rating-group">
                <Rating value={1} />
                <ProgressBar value={oneStar} summary={ratings.length} />
                <span>{oneStar}</span>
              </div>
              <button onClick={() => setIsOpen(true)} id="add-rating-btn">Viết nhận xét</button>
              <AddRating image={product.images[0]} name={product.name} open={isOpen} onClose={() => setIsOpen(false)}></AddRating>
            </div>
            <div className="ratings-details">
              {ratings.map(r =>
                <div>
                  <div className="user-rating">
                    <div className="profile-picture"></div>
                    <div>
                      <div>
                        <p className="user-name">{r.user.lastName + " " + r.user.firstName}</p>
                        <Rating value={r.rating} text={r.rating} />
                      </div>
                      <p style={{marginTop: "0.6rem"}}>{r.comment}</p>
                    </div>
                  </div>
                  <div className="indicator"></div>
                </div>)}
            </div>
          </div>
        </div> : ""
      }
    </>
  )
}

export default ProductRatings
