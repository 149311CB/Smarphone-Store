import React, {useState} from "react";
import {useSelector} from "react-redux";

const HeroSlide = () => {
  const {loading, error, banners} = useSelector(state => state.bannerList)
  const [x, setX] = useState(0);
  const slideLeft = () => {
    if (x !== 0) {
      setX(x + 100);
    } else {
      setX(-(banners.length - 1) * 100)
    }
  }
  const slideRight = () => {
    if (x !== -(banners.length - 1) * 100) {
      setX(x - 100)
    } else {
      setX(0)
    }
  }
  return (
    <div className="carousel-container">
      <div className="carousel-slide">
        <button id="slide-left" onClick={e => slideLeft()}><i className="fas fa-chevron-left" ></i></button>
        {banners.map((p, index) =>
          <div key={index} className="carousel-image" style={{transform: `translateX(${x}%)`}}>
            <img src={p.image} />
          </div>
        )}
        <button id="slide-right" onClick={e => slideRight()}><i className="fas fa-chevron-right" ></i></button>
      </div>
    </div>
  );
};

export default HeroSlide;
