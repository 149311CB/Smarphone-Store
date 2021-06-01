import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

const ShippingContainer = () => {
  const {loading, error, address} = useSelector(state => state.getAddressByUser)
  const {userInfo} = useSelector(state => state.userLogin)

  return (
    <div className="shipping">
      <div className="shipping-row">
        <div>Địa chỉ nhận hàng</div>
        <Link to="/addresses" className="add-address-btn">Thay đổi</Link>
      </div>
      <div className="indicator" />
      <div className="shipping-col">
          {address ?
              <>
                  <div>{userInfo.lastname} {userInfo.firstName}</div>
                  <div>{address.addressDetails} {address.addressDetails ? "," : ""} {address.ward}, {address.district}, {address.city}</div>
              </>
          :
              <>
                  {!userInfo ?
                    <Link to={"/login"} style={{color:"#323d43"}}><i className="fas fa-map-marker-alt"/> Đăng nhập để thêm địa chỉ giao hàng</Link>
                      :
                    <Link to={"/addresses"} style={{color:"#323d43"}}><i className="fas fa-map-marker-alt"/> Thêm địa chỉ giao hàng</Link>
                  }
              </>
          }
      </div>
    </div>

  )
}

export default ShippingContainer
