import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {filterAction} from "../../actions/FiltersActions";

const FilterBar = () => {

    const dispatch = useDispatch()
    const {filter} = useSelector(state => state.filter)
    const changeActive=(option) =>{
        // document.querySelector(".active").classList.remove("active")
        // document.getElementById(option).classList.add("active")
            if(option === "new")
                dispatch(filterAction("update",{sorting:'createAt'}))
            else if(option==="low"){
                dispatch(filterAction("update",{sorting:'lowprice'}))
            }
            else if(option==="high")
                dispatch(filterAction("update",{sorting:'highprice'}))
            else{
                dispatch(filterAction("update",{sorting:'all'}))
            }
    }

   useEffect(() =>{
        if(filter && filter.sorting){
            switch (filter.sorting){
                case 'createAt':
                    document.getElementById("new").classList.add("active")
                    break;
                case "lowprice":
                    document.getElementById("low").classList.add("active")
                    break;
                case "highprice":
                    document.getElementById("high").classList.add("active")
                    break;
                default:
                    document.getElementById("all").classList.add("active")
                    break;
            }
        }else{
            document.getElementById("all").classList.add("active")
        }
    })

  return (
    <div id="filter-bar">
      <button id="all" onClick={e => changeActive("all")}>Tất cả</button>
      <button id="new" onClick={e => changeActive("new")}>Hàng mới</button>
      <button id="high" onClick={e => changeActive("high")}>Giá cao</button>
      <button id="low" onClick={e => changeActive("low")}>Giá thấp</button>
    </div >
  )
}

export default FilterBar

