import React, {useState, useLayoutEffect, useRef, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {filterAction} from '../../../actions/FiltersActions'

const BrandGroup = () => {
  {/*This property use to prevent run useEffect on the first render*/}
  const isInitialMount = useRef(true);

  {/*States*/}
  const dispatch = useDispatch();
  const [manufactor, setManufactor] = useState("");
  const [currentActive, setCurrentActive] = useState("")

  {/*To set manufactor*/}
  {/*To change active checkbox*/}
  const filter = (value, e) => {
    {/*To change checked checkbox*/}
    {/*To dispatch clear filter action*/}
    const checkboxArr = Array.from(document.querySelectorAll(".brand-group input"))
    checkboxArr.map(cb => cb.checked = false)
    if (currentActive.target == e.target) {
      setCurrentActive("")
      setManufactor("")
      e.target.classList.remove("active")

      dispatch(filterAction("manufactor", {manufactor: manufactor}))
      return;
    }

    setCurrentActive(e)
    e.target.classList.add("active")
    e.target.checked = true
    setManufactor(value);

  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      if (currentActive != "") {
        dispatch(filterAction("update", {manufactor: manufactor}))
      }
    }
  })

  return (
    <div className="brand-group">
      <h4>Thương hiệu</h4>
      <div className="checkbox-group">
        <input type="checkbox" id="apple" value="Apple" onClick={e => filter(e.target.value, e)} />
        <label htmlFor="apple">Apple</label>
      </div>
      <div className="checkbox-group">
        <input type="checkbox" id="samsung" value="Samsung" onClick={e => filter(e.target.value, e)} />
        <label htmlFor="samsung">Samsung</label>
      </div>
      <div className="checkbox-group">
        <input type="checkbox" id="oppo" value="Oppo" onClick={e => filter(e.target.value, e)} />
        <label htmlFor="oppo">Oppo</label>
      </div>
      <div className="checkbox-group">
        <input type="checkbox" id="xiaomi" value="Xiaomi" onClick={e => filter(e.target.value, e)} />
        <label htmlFor="xiaomi">Xiaomi</label>
      </div>
      <div className="checkbox-group">
        <input type="checkbox" id="realme" value="Realme" onClick={e => filter(e.target.value, e)} />
        <label htmlFor="realme">Realme</label>
      </div>
      <div className="checkbox-group">
        <input type="checkbox" id="vsmart" value="Vsmart" onClick={e => filter(e.target.value, e)} />
        <label htmlFor="vsmart">Vsmart</label>
      </div>
      <div className="checkbox-group">
        <input type="checkbox" id="bphone" value="Bphone" onClick={e => filter(e.target.value, e)} />
        <label htmlFor="bphone">Bphone</label>
      </div>
      <div className="checkbox-group">
        <input type="checkbox" id="huawei" value="Huawei" onClick={e => filter(e.target.value, e)} />
        <label htmlFor="huawei">Huawei</label>
      </div>
    </div>
  )
}

export default BrandGroup

