import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

const ShippingContainer = () => {
  const {loading, error, address} = useSelector(state => state.getAddressByUser)
  const {userInfo} = useSelector(state => state.userLogin)

  if (address == null) {
    return null
  }
  return (
    <div className="shipping">
      <div className="shipping-row">
        <div>Địa chỉ nhận hàng</div>
        <Link to="/addresses" className="add-address-btn">Thay đổi</Link>
      </div>
      <div className="indicator" />
      <div className="shipping-col">
        <div>{userInfo.lastname} {userInfo.firstName}</div>
        <div>{address.addressDetails} {address.addressDetails ? "," : ""} {address.ward}, {address.district}, {address.city}</div>
      </div>
    </div>

  )
}

export default ShippingContainer
