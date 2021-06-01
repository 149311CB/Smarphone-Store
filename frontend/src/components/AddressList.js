import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import {getAddressListByUserAction} from '../actions/AddressActions'
import primaryAddrr from '../right.png'
import ClipLoader from "react-spinners/ClipLoader";

const AddressList = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {loading, error, addressList} = useSelector(state => state.addressListByUser)
  const user = JSON.parse(localStorage.getItem("userInfo"))

  const changeShipping = (add) => {
    localStorage.setItem("shipping", JSON.stringify(add))
    history.push("/cart")
  }

  const editAddress = (add) => {

  }

  const deleteAddress =(add) =>{

  }

  useEffect(() => {
    dispatch(getAddressListByUserAction())
  }, [])

  return (
      <>
      {loading || loading == null
          ?
          <div className="loader"><ClipLoader color={"#A7c080"} size={100} /></div>
          :
    <div className="address-list-container">
      <button className="btn primary-btn lg" style={{margin: "1.2rem 1.2rem 0 1.2rem"}} onClick={() => history.push("/addresses/add")}>Thêm địa chỉ</button>
      {addressList != null
      ?
      <div className="address-list">
        {addressList.map(add => (
          <div className="address-card">
            {add.isPrimary
              ?
              <>
                <div className="address-header">
                  <div className="image-container">
                    <img src={primaryAddrr} />
                  </div>
                  <span>Địa chỉ mặc định</span>
                </div>
                <div className="indicator"/>
              </>
              : ""}
            <div className="address-body">
              Địa chỉ: {add.addressDetails}, {add.ward}, {add.district}, {add.city}
            </div>
            <div className="address-footer">
              <button className="btn primary-btn nm dark" onClick={e => changeShipping(add)}>Giao đến địa chỉ này</button>
              <button className="btn light-btn nm light" onClick={e => editAddress(add)}>Chỉnh sửa</button>
              <button className="btn nm danger-btn" onClick={e => deleteAddress(add)}>Xóa</button>
            </div>
          </div>
        ))}
      </div>
          :
          <p style={{margin:"1.2rem"}}>You don't have any address yet</p>}
    </div>}
      </>
  )
}

export default AddressList