import React from "react";

const Card = ({ data }) => {
  return (
    <div className="card">
      {data.header ? <div className="card header"></div> : ""}
      {data.header ? <div className="break"></div> : ""}
      <div className="body">
        <div className="picture">
          <img src={data.image} alt="" />
        </div>
        <h3 className="title">{data.name}</h3>
      </div>
    </div>
  );
};

export default Card;
