import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import {useDispatch} from 'react-redux'
import {filterAction} from '../../../actions/FiltersActions'

const PriceGroup = () => {
  {/*This property use to prevent run useEffect on the first render*/}
  const isInitialMount = useRef(true);

  {/*States*/}
  const dispatch = useDispatch()
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(Number.MAX_SAFE_INTEGER)
  const [currentActive, setCurrentActive] = useState("")

  {/*To set min & max price*/}
  {/*To change active button*/}
  const filter = (type, value, e) => {
    {/*To change active button*/}
    {/*To dispatch clear filter action*/}
    if (currentActive.target === e.target) {
      setMinPrice(0)
      setMaxPrice(Number.MAX_SAFE_INTEGER);
      setCurrentActive("")
      e.target.classList.remove("active")

      dispatch(filterAction("price", {minprice: minPrice, maxprice: maxPrice}))
      return;
    }

    const priceBtnsArr = Array.from(document.querySelectorAll('.price-group button'))
    priceBtnsArr.map(pb => pb.classList.remove("active"))
    e.target.classList.add("active")
    setCurrentActive(e)

    {/*To set min & max price*/}
    switch (type) {
      case "min":
        setMaxPrice(Number.MAX_SAFE_INTEGER)
        setMinPrice(value)
        break;
      case "max":
        setMinPrice(0)
        setMaxPrice(value)
        break;
      case "both":
        setMinPrice(value.min)
        setMaxPrice(value.max)
        break;
    }
  }

  {/*To dispatch update filter action - Will run every update*/}
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      if (currentActive != "") {
        dispatch(filterAction("update", {minprice: minPrice, maxprice: maxPrice}))
      }
    }
  })

  const filterSubmit = () => {
    try {
      setMinPrice(document.getElementById("min-price").value)
      setMaxPrice(document.getElementById("max-price").value)
      document.getElementById("min-price").value = null
      document.getElementById("max-price").value = null
    } catch (error) {
      return;
    }
  }

  return (
    <div className="price-group">
      <h4>Giá</h4>
      <button onClick={e => filter("max", 1500000, e)}>Dưới 1.500.000</button>
      <button onClick={e => filter("both", {min: 1500000, max: 5500000}, e)}>Từ 1.500.000 đến 5.500.000</button>
      <button onClick={e => filter("both", {min: 5500000, max: 16500000}, e)}>Từ 5.500.000 đến 16.500.000</button>
      <button onClick={e => filter("min", 16500000, e)}>Trên 16.500.000</button>
      <div className="price-input">
        <input id="min-price" type="number" placeholder="0" readOnly={currentActive != "" ? true : false} />
        <span>-</span>
        <input id="max-price" type="number" placeholder="0" readOnly={currentActive != "" ? true : false} />
      </div>
      <button id="apply" onClick={e => filterSubmit()} disabled={currentActive != "" ? true : false}>Áp dụng</button>
    </div>
  )
}

export default PriceGroup

