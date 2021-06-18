import React, {useEffect, useRef, useState} from 'react'
import AccountSidebar from "../components/accounts/AccountSidebar";
import {getAddressByIdAction, getCityListAction, updateAddressAction} from "../actions/AddressActions";
import {useDispatch, useSelector} from "react-redux";

const ACCOUNT_SCREEN_STYLES ={
  display:"flex",
  justifyContent:"space-between",
  width:"100%"
}

const EditAddress = ({match}) => {
  const id = useRef(0)
  const dispatch=useDispatch()
  const {loading:cityLoading, error:cityError, cities} = useSelector(state => state.cityList)
  const {loading,error,address} = useSelector(state => state.addressById)

  const [city, setCity] = useState(0);
  const [district, setDistrict] = useState(0)
  const [ward, setWard] = useState(0)
  const [details, setDetails] = useState("")
  const [primary, setPrimary] = useState(address != null ? address.isPrimary : 0)

  const updateAddress=(e)=>{
    e.preventDefault()
    dispatch(updateAddressAction(match.params.id, {
      city: cities[city].Name,
      district: cities[city].Districts[district].Name,
      ward: cities[city].Districts[district].Wards[ward].Name,
      addressDetails: details,
      isPrimary: primary
    }))
  }


  useEffect(() => {
    if(id.current !== match.params.id){
        id.current=match.params.id
      dispatch(getCityListAction())
      dispatch(getAddressByIdAction(match.params.id))
    }
    if(address && cities){
      cities.map((c,index)=>{
          if(c.Name === address.city){
            setCity(index)
              cities[index].Districts.map((d,districtIndex)=>{
                  if(d.Name === address.district){
                    setDistrict(districtIndex)
                    cities[index].Districts[districtIndex].Wards.map((w,wardIndex)=>{
                        if(w.Name === address.ward){
                          setWard(wardIndex)
                        }
                    })
                  }
              })
          }
      })
    }
  }, [match,cities,address]);

  if(cities==null || address == null){
    return null
  }

  return (
    <div className="edit-address" style={ACCOUNT_SCREEN_STYLES}>
      <AccountSidebar active={"addresses"} />
      <form className="edit-address-form" onSubmit={updateAddress}>
        <div className="form-group">
          <label htmlFor={"city"}>Tỉnh/ Thành phố</label>
          <div className="select-group">
            <select id="city" value={city} onChange={(e) => setCity(parseInt(e.target.value))}>
              {cities.map((c,index) =>(
                <option value={index}>{c.Name}</option>
              ))}
            </select>
            <img src="https://149311cbimages.s3.amazonaws.com/down.png" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor={"district"}>Phường/ Xã</label>
          <div className="select-group">
            <select id="district" value={district} onChange={(e) => setDistrict(parseInt(e.target.value))}>
              {cities[city].Districts.map((d, index) => (
                  <option value={index}>{d.Name}</option>
                  ))}
            </select>
            <img src="https://149311cbimages.s3.amazonaws.com/down.png" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor={"ward"} >Phường/ Xã</label>
          <div className="select-group">
            <select id="ward" value={ward} onChange={(e)  => setWard(parseInt(e.target.value))}>
              {cities[city]
                  .Districts[district]
                  .Wards.map((w, index) =>(
                        <option value={index}>{w.Name}</option>
                      ))}
            </select>
            <img src="https://149311cbimages.s3.amazonaws.com/down.png" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor={"address-detail"}>
            Địa chỉ chi tiết
          </label>
          <div>
            <input id="address-detail" type="text"
                   placeholder="Địa chỉ chi tiết"
                   value={address.addressDetails}
                   onChange={(e) => setDetails(e.target.value)}/>
          </div>
          {error && error.includes("addressDetails")
              ? <div className="form-error">Address detail must not be empty</div> : ""}
        </div>
        <div className="checkbox-group">
          <input id="isPrimary" type="checkbox"
                 checked={primary === 1 ? "checked":""}
                 onChange={e =>
                     e.target.checked ? setPrimary(1) : setPrimary(0)}
          />
          <label htmlFor="isPrimary" >
            Đặt làm địa chỉ mặc định
          </label>
        </div>
        <button >Lưu</button>
      </form>
    </div>
  )
}

export default EditAddress

