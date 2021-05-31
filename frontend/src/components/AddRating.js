import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import ReactStars from "react-rating-stars-component";

const AddRating = ({image, name, open, onClose}) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  if (!open) return null
  const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "40%",
    minHeight: "50%",
    borderRadius: "0.3rem",
    backgroundColor: '#FFF',
    padding: "0.6rem",
    zIndex: 1000
  }
  const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .3)',
    zIndex: 1000
  }


  const ratingChanged = (newRating) => {
    setRating(newRating)
  };

  const submitHandler = (e) => {
    e.prevenDefault()
  }
  return ReactDOM.createPortal(

    <>
      <div style={OVERLAY_STYLES} />
      <div className="add-rating" style={MODAL_STYLES}>
        <div className="add-rating-header">
          <div className="add-rating-product">
            <div style={{width: "50px", height: "50px"}}>
              <img src={image} style={{width: "100%", height: "100%"}} />
            </div>
            <span>{name}</span>
          </div>
          <button onClick={onClose}><i className="fas fa-times fa-lg"></i></button>
        </div>
        <div className="react-star-container">
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={80}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            color="rgba(0, 0, 0, 0.125)"
            activeColor="#f0bc37"
          />
        </div>
        <div className="comment-form-container">
          <form>
            <textarea rows={8} placeholder="Chia sẻ cảm nhận của bạn về sản phẩm này" onChange={e => setComment(e.target.value)}></textarea>
            <button id="add-rating" type="submit" onSubmit={submitHandler}>Gửi đánh giá</button>
          </form>
        </div>
      </div>

    </>,
    document.getElementById('portal')
  )
}

export default AddRating

