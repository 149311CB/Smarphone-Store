import React, {useState} from "react";
import Button from "../Button";
import {useDispatch, useSelector} from "react-redux";
import {fuzzySearchAction} from "../../actions/productActions";
import {useClickOutsidev2} from "../../hooks/clickOutsidev2";
import {Link, useHistory} from "react-router-dom";
import {filterAction} from "../../actions/FiltersActions";

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'VND',
});

const HeaderSearchBar = () => {
  const history=useHistory( )
  const {visible,setVisible,ref} = useClickOutsidev2(false)
  const dispatch=useDispatch()
  const {loading,error,fuzzy} = useSelector(state => state.fuzzySearch)
  const handleClick=() =>{
      setVisible((prevState) => !prevState)
  }
  const [keyword,setKeyword] = useState("")

  const handleChange=(e) =>{
    setVisible(true)
    dispatch(fuzzySearchAction(e.target.value,3))
    setKeyword(e.target.value)
  }

  const handleSearchClick=(e) =>{
    e.preventDefault()
    dispatch(filterAction("update",{keyword:keyword}))
  }

  return (
      <>
    <div className="header-searchbar">
      <form className="search-form" style={{display:"flex"}}>
        <input type="text"
               onClick={handleChange}
               onChange={handleChange}/>
        <button onClick={handleSearchClick} className={"search-button"}>TÌM KIẾM</button>
      </form>
      {
        visible &&
      <div ref={ref} className={"fuzzy-result"}>
        {
          fuzzy && fuzzy.map(f=>
              <div className={"result"}>
                <div className={"fuzzy-image-container"}>
                  <img src={f.images[0]}/>
                </div>
                <div className={"fuzzy-info"}>
                <div style={{marginBottom:"0.6rem"}} onClick={()=>setVisible(false)}>
                  <Link to={`/details/${f._id}`}>{ f.name }</Link>
                </div>
                  <div style={{fontSize:"0.625rem"}} className={"price"}>
                    {formatter.format(f.price)}
                  </div>
                </div>
              </div>
          )
        }
      </div>

      }
      </div>

      </>
  );
};

export default HeaderSearchBar;
