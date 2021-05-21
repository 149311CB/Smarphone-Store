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
    //These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  return (
    <Link to={`/details/${id}`}>
      <div className="card">
        {/* {data.header ? <div className="card header"></div> : ""}
        {data.header ? <div className="break"></div> : ""} */}
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
