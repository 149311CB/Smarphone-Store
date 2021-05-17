import React, {useEffect, useState, useLayoutEffect, useRef} from "react";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import {listProducts} from "../actions/productActions";
import {bannerListAction} from '../actions/ultilsActions'
import {useDispatch, useSelector} from "react-redux";
import FilterBar from '../components/filters/FilterBar'
import Paginations from '../components/Paginations'

const HomeScreen = () => {
  {/* const localFilter = localStorage.getItem('filter')*/}
  const [option, setOption] = useState("all")

  const changeActive = (value) => {
    setOption(value)
  }

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const {loading, error, current, products} = productList;
  const {filter} = useSelector(state => state.filter)

  useEffect(() => {
    dispatch(listProducts(filter))
  }, [filter])

  useEffect(() => {
    dispatch(bannerListAction())
  }, [])

  return (
    <>
      <Carousel products={products} />
      <FilterBar changeActive={changeActive} option={option} />
      <div className="product-row">
        {products.map((s, index) => (
          <Card data={s} key={index} />
        ))}
      </div>
      {current ? <Paginations current={current} /> : ""}
    </>
  );
};

export default HomeScreen;
