import React, {useState, useLayoutEffect, useRef, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {filterAction} from '../../../actions/FiltersActions'

const RomGroup = () => {
  {/*This property use to prevent run useEffect on the first render*/}
  const isInitialMount = useRef(true);

  {/*States*/}
  const dispatch = useDispatch();
  const [minRom, setMinRom] = useState(0)
  const [maxRom, setMaxRom] = useState(Number.MAX_SAFE_INTEGER);
  const [currentActive, setCurrentActive] = useState("")

  {/*To set manufactor*/}
  {/*To change active checkbox*/}
  const filter = (type, value, e) => {
    {/*To change checked checkbox*/}
    {/*To dispatch clear filter action*/}
    const checkboxArr = Array.from(document.querySelectorAll(".rom-group input"))
    checkboxArr.map(cb => cb.checked = false)
    if (currentActive.target == e.target) {
      setCurrentActive("")
      setMinRom(0)
      setMaxRom(Number.MAX_SAFE_INTEGER)
      e.target.classList.remove("active")

      dispatch(filterAction("rom", {minrom: minRom, maxrom: maxRom}))
      return;
    }

    setCurrentActive(e)
    e.target.classList.add("active")
    e.target.checked = true
    switch (type) {
      case "min":
        setMaxRom(Number.MAX_SAFE_INTEGER)
        setMinRom(value.min)
        break;
      case "max":
        setMinRom(0)
        setMaxRom(value.max)
        break;
      case "both":
        setMinRom(value.min)
        setMaxRom(value.max)
        break;
    }
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      if (currentActive != "") {
        dispatch(filterAction("update", {minrom: minRom, maxrom: maxRom}))
      }
    }
  })

  return (
    <div className="rom-group">
      <h4>Bộ nhớ trong</h4>
      <div className="checkbox-group">
        <input type="checkbox" id="0g" value={0} onClick={e => filter("max", {max: 32}, e)} />
        <label htmlFor="0g">Dưới 32 GB</label>
      </div>
      <div className="checkbox-group">
        <input type="checkbox" id="32g" value={1} onClick={e => filter("both", {min: 32, max: 64}, e)} />
        <label htmlFor="32g">32GB - 64GB</label>
      </div>
      <div className="checkbox-group">
        <input type="checkbox" id="64g" value={2} onClick={e => filter("both", {min: 64, max: 128}, e)} />
        <label htmlFor="64g">64GB - 128GB</label>
      </div>
      <div className="checkbox-group">
        <input type="checkbox" id="128g" value={3} onClick={e => filter("both", {min: 128, max: 256}, e)} />
        <label htmlFor="128g">128GB - 256GB</label>
      </div>
      <div className="checkbox-group">
        <input type="checkbox" id="512g" value={4} onClick={e => filter("min", {min: 256}, e)} />
        <label htmlFor="512g">512 GB trở lên</label>
      </div>
    </div>
  )
}

export default RomGroup

