import React, {useEffect, useState} from "react";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import {listProducts} from "../actions/productActions";
import {bannerListAction} from '../actions/ultilsActions'
import {useDispatch, useSelector} from "react-redux";
import FilterBar from '../components/filters/FilterBar'

const HomeScreen = () => {
  const [option, setOption] = useState("all")

  const changeActive = (value) => {
    setOption(value)
  }

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const {loading, error, products} = productList;


  useEffect(() => {
    dispatch(listProducts());
    dispatch(bannerListAction())
  }, [dispatch]);

  return (
    <>
      <Carousel products={products} />
      <FilterBar changeActive={changeActive} option={option} />
      <div className="product-row">
        {products.map((s, index) => (
          <Card data={s} key={index} />
        ))}
      </div>
    </>
  );
};

export default HomeScreen;
