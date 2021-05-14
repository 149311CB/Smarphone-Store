import React, {useEffect} from 'react'

const FilterBar = ({changeActive, option}) => {

  useEffect(() => {
    const filterBtn = Array.from(document.querySelectorAll('#filter-bar button'));
    filterBtn.map(f => f.classList.contains("active") ? f.classList.remove("active") : "")
    const elemnt = document.getElementById(option)
    elemnt.classList.add("active")
  }, [option])

  return (
    <div id="filter-bar">
      <button id="all" onClick={e => changeActive("all")}>Tất cả</button>
      <button id="topsale" onClick={e => changeActive("topsale")}>Bán chạy</button>
      <button id="new" onClick={e => changeActive("new")}>Hàng mới</button>
      <button id="low" onClick={e => changeActive("low")}>Giá thấp</button>
      <button id="high" onClick={e => changeActive("high")}>Giá cao</button>
    </div >
  )
}

export default FilterBar

