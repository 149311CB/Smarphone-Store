import React from 'react'
import Rating from '../../Rating'

const RatingGroup = () => {

  return (
    <div className="rating-group">
      <h4>Đánh giá</h4>
      <Rating value={5} text="Từ 5 sao" color="#F0BC37" />
      <Rating value={4} text="Từ 4 sao" color="#F0BC37" />
      <Rating value={3} text="Từ 3 sao" color="#F0BC37" />
    </div>
  )
}

export default RatingGroup

