import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {withRouter} from "react-router-dom"
import {
  getAddressByIdAction,
  getAddressByUserAction,
  getCityListAction,
  updateAddressAction
} from '../actions/AddressActions'
import ClipLoader from "react-spinners/ClipLoader";

const EditAddress = ({location}) => {
  const dispatch = useDispatch()

  const {loading, error, cities} = useSelector(state => state.cityList)
  const {address} = useSelector(state => state.addressById)
  const {hash} = location
  const id=hash.split("/")[1]

  const [city, setCity] = useState(0)
  const [district, setDistrict] = useState(0)
  const [ward, setWard] = useState(0)
  const [details, setDetails] = useState("")
  const [primary, setPrimary] = useState(0)

  const addAddressHanlder = (e) => {
    e.preventDefault()
    dispatch(updateAddressAction(1, {
      city: cities[city].Name,
      district: cities[city].Districts[district].Name,
      ward: cities[city].Districts[district].Wards[ward].Name,
      addressDetails: details,
      isPrimary: primary
    }))
  }

  useEffect(() => {
      if(typeof loading === "undefined" && typeof cities === "undefined"){
        dispatch(getCityListAction())
        dispatch(getAddressByIdAction(id))
      }else if(cities && cities.length >0){
        cities.map((c,index) => c.Name === address.city &&
           setCity(index)
        )
      }
  }, [address,cities])

  return (
    <>
      {loading == null || loading ? <div className="loader"><ClipLoader color={"#A7c080"} size={100} /></div > :
        <form className="add-address-form">
          <div className="form-group">
            <label htmlFor={"city"}>Tỉnh/ Thành phố</label>
            <div className="select-group">
              <select id="city" onChange={(e) => setCity(e.target.value)}>
                {cities.map((c, index) =>
                    <option selected={city === index ? "selected" : ""}
                            value={index}>{c.Name}</option>)
                }
              </select>
              <img src="https://149311cbimages.s3.amazonaws.com/down.png" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor={"district"}>Phường/ Xã</label>
            <div className="select-group">
              <select id="district" onChange={e => setDistrict(e.target.value)}>
                {cities[city].Districts.map((d, index) =>
                  <option selected={address.district === d.Name} value={index}>{d.Name}</option>
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

export default withRouter(EditAddress)
