import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getCityListAction, addAddressAction} from '../actions/AddressActions'
import ClipLoader from "react-spinners/ClipLoader";
import {useHistory} from "react-router-dom";
import {ADD_ADDRESS_RESET} from "../constants/AddressConstants";

const AddAddress = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const {loading, error, cities} = useSelector(state => state.cityList)
    const {loading:addLoading,error:addError,newAddress} = useSelector(state => state.addAddress)
  const [city, setCity] = useState(0)
  const [district, setDistrict] = useState(0)
  const [ward, setWard] = useState(0)
  const [details, setDetails] = useState("")
  const [primary, setPrimary] = useState(0)

  const addAddressHanlder = (e) => {
    e.preventDefault()
    dispatch(addAddressAction({
      city: cities[city].Name,
      district: cities[city].Districts[district].Name,
      ward: cities[city].Districts[district].Wards[ward].Name,
      addressDetails: details,
      isPrimary: primary,
      createdAt: new Date().toISOString()
    }))
  }

  useEffect(() => {
      if(cities == null || cities.length === 0){
        dispatch(getCityListAction())
      }
      if(newAddress){
        dispatch({type:ADD_ADDRESS_RESET})
        history.push("/addresses")
      }
  }, [newAddress])

  return (
    <>
      {loading == null || loading || addLoading
          ?
          <div className="loader"><ClipLoader color={"#A7c080"} size={100} /></div >
          :
        <form className="add-address-form">
          <div className="form-group">
            <label htmlFor={"city"}>Tỉnh/ Thành phố</label>
            <div className="select-group">
              <select id="city" onChange={(e) => setCity(e.target.value)}>
                {cities.map((c, index) => <option value={index}>{c.Name}</option>)}
              </select>
              <img src="https://149311cbimages.s3.amazonaws.com/down.png" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor={"district"}>Phường/ Xã</label>
            <div className="select-group">
              <select id="district" onChange={e => setDistrict(e.target.value)}>
                {cities[city].Districts.map((d, index) =>
                  <option value={index}>{d.Name}</option>
                )}
              </select>
              <img src="https://149311cbimages.s3.amazonaws.com/down.png" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor={"district"}>Địa chỉ</label>
            <div className="select-group">
              <select id="district" onChange={e => setWard(e.target.value)}>
                {cities[city]
                  .Districts[district]
                  .Wards.map((d, index) =>
                    <option value={index}>{d.Name}</option>
                  )}
              </select>
              <img src="https://149311cbimages.s3.amazonaws.com/down.png" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor={"address-detail"}>
              Địa chỉ chi tiết
        </label>
            <div>
              <input id="address-detail" type="text" placeholder="Địa chỉ chi tiết" onChange={e => setDetails(e.target.value)} />
            </div>
            {error && error.includes("addressDetails") ? <div className="form-error">Address detail must not be empty</div> : ""}
          </div>
          <div className="checkbox-group">
            <input id="isPrimary" type="checkbox"
              onChange={e =>
                e.target.checked ? setPrimary(1) : setPrimary(0)} />
            <label htmlFor="isPrimary" >
              Đặt làm địa chỉ mặc định
    </label>
          </div>
          <button onClick={e => addAddressHanlder(e)}>Thêm địa chỉ</button>
        </form>
      }</>
  )
}

export default AddAddress
