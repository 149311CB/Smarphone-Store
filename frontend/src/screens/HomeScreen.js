import React, {useEffect, useState, useLayoutEffect, useRef} from "react";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import {listProducts} from "../actions/productActions";
import {bannerListAction} from '../actions/ultilsActions'
import {useDispatch, useSelector} from "react-redux";
import FilterBar from '../components/filters/FilterBar'
import ClipLoader from "react-spinners/ClipLoader";
import Paginations from "../components/Paginations";

const HomeScreen = () => {
  {/* const localFilter = localStorage.getItem('filter')*/}
  const [option, setOption] = useState("all")

  const changeActive = (value) => {
    setOption(value)
  }

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const {loading, error, current, products} = productList;
  const [currentpage, setCurrentpage] = useState(products && products.page ? products.page : 1)
  let {filter} = useSelector(state => state.filter)
  console.log(filter)

  useEffect(() => {
    window.scroll({top: 0, behavior: 'smooth'})
    dispatch(listProducts(filter, currentpage))
  }, [filter, currentpage])

  useEffect(() => {
    dispatch(bannerListAction())
  }, [])
  {/* loading?<ClipLoader color = {"#A7c080"} override = {override} size = {35} />*/}
  return (
    <>
      {loading ? <div className="loader"> <ClipLoader color={"#A7c080"} size={100} /> </div> :
        <div class="sub-main">
          <Carousel products={products} />
          <FilterBar option={option} />
          <div className="product-row">
            {products ? products.specs.map((s, index) => (
              <Card id={s._id} name={s.name}
                ratings={s.reviews != "undefined" ? s.reviews : []}
                price={s.price} image={s.images[0]} key={index} />
            )) : ""}
          </div>
          {products
            ? <Paginations total={products.total}
              setcurrentpage={setCurrentpage}
              currentpage={currentpage} /> : ""}
        </div>}
    </>
  );
};

export default HomeScreen;
