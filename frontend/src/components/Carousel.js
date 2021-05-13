import React, { useEffect, useState } from "react";

const HeroSlide = ({ products }) => {
  const [timer, setTime] = useState();
  const [primary, setPrimary] = useState("");

  useEffect(() => {
    const slide = () => {
      setPrimary("slide");
    };
    setTimeout(() => setPrimary("changed"), 3000);
    console.log(primary);
  }, []);

  return (
    <div className="hero-container">
      <div className="hero-slide">
        {products.map((s, index) =>
          index < 3 ? (
            index === 1 ? (
              <div key={index} className={"hero-image " + primary}>
                <img src={s.image} />
              </div>
            ) : (
              <div key={index} className="hero-image">
                <img src={s.image} />
              </div>
            )
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
};

export default HeroSlide;
