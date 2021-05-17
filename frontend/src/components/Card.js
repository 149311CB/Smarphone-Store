import React from "react";
import {Link} from "react-router-dom";

const Card = ({data}) => {
  return (
    <Link to={`/details/${data._id}`}>
      <div className="card">
        {data.header ? <div className="card header"></div> : ""}
        {data.header ? <div className="break"></div> : ""}
        <div className="body">
          <div className="picture">
            <img src={data.images[0]} alt="" />
          </div>
          <h3 className="title">{data.name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;
