import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import HeroSlide from "../components/HeroSlide";
import { listProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <HeroSlide products={products} />
      <div className="product-row">
        {products.map((s, index) => (
          <Card data={s} key={index} />
        ))}
      </div>
    </>
  );
};

export default HomeScreen;