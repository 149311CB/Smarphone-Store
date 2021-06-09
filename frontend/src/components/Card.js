import React from "react";
import {Link} from "react-router-dom";
import Rating from '../components/Rating'

const Card = ({id, name, image, ratings, price}) => {
  let rating = 0
  if (ratings.length > 0) {
    rating = ratings.reduce((acc, curr) => acc + curr.rating, 0)
  }
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
  });
  return (
    <Link to={`/details/${id}`}>
      <div className="card">
        <div className="body">
          <div className="picture">
            <img src={image} alt="" />
          </div>
          <div className="card-info">
            <h3 className="title">{name}</h3>
            <p>{formatter.format(price)}</p>
            <Rating value={rating / ratings.length} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
