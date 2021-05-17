import React, {useState, useLayoutEffect, useRef, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {filterAction} from '../../../actions/FiltersActions'

const RamGroup = () => {
  {/*This property use to prevent run useEffect on the first render*/}
  const isInitialMount = useRef(true);

  {/*States*/}
  const dispatch = useDispatch();
  const [minRam, setMinRam] = useState(0)
  const [maxRam, setMaxRam] = useState(Number.MAX_SAFE_INTEGER);
  const [currentActive, setCurrentActive] = useState("")

  {/*To set manufactor*/}
  {/*To change active checkbox*/}
  const filter = (type, value, e) => {
    {/*To change checked checkbox*/}
    {/*To dispatch clear filter action*/}
    const checkboxArr = Array.from(document.querySelectorAll(".ram-group input"))
    checkboxArr.map(cb => cb.checked = false)
    if (currentActive.target == e.target) {
      setCurrentActive("")
      setMinRam(0)
      setMaxRam(Number.MAX_SAFE_INTEGER)
      e.target.classList.remove("active")

      dispatch(filterAction("ram", {minram: minRam, maxram: maxRam}))
      return;
    }

    setCurrentActive(e)
    e.target.classList.add("active")
    e.target.checked = true
    switch (type) {
      case "min":
        setMaxRam(Number.MAX_SAFE_INTEGER)
        setMinRam(value.min)
        break;
      case "max":
        setMinRam(0)
        setMaxRam(value.max)
        break;
      case "both":
        setMinRam(value.min)
        setMaxRam(value.max)
        break;
    }
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      if (currentActive != "") {
        dispatch(filterAction("update", {minram: minRam, maxram: maxRam}))
      }
    }
  })

  return (
    <div className="ram-group">
      <h4>Dung lượng RAM</h4>
      <div className="checkbox-group">
        <input type="checkbox" id="0ag" value={0} onClick={e => filter("max", {max: 4}, e)} />
        <label htmlFor="0ag">Dưới 4GB</label>
      </div>
      <div className="checkbox-group">
        <input type="checkbox" id="4ag" value={1} onClick={e => filter("both", {min: 4, max: 6}, e)} />
        <label htmlFor="4ag">4GB - 6GB</label>
      </div>
      <div className="checkbox-group">
        <input type="checkbox" id="8ag" value={2} onClick={e => filter("min", {min: 8}, e)} />
        <label htmlFor="8ag">8GB trở lên</label>
      </div>
    </div>
  )
}

export default RamGroup

