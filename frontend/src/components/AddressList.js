import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import {getAddressListByUserAction} from '../actions/AddressActions'
import primaryAddrr from '../right.png'

const AddressList = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {loading, error, addressList} = useSelector(state => state.addressListByUser)
  const user = JSON.parse(localStorage.getItem("userInfo"))

  const changeShipping = (add) => {
    localStorage.setItem("shipping", JSON.stringify(add))
    history.goBack()
  }

  const editAddress = (add) => {

  }

  useEffect(() => {
    dispatch(getAddressListByUserAction())
  }, [])

  if (addressList == null) {
    return null
  }
  return (
    <div className="address-list-container">
      <button className="btn primary-btn lg" style={{margin: "1.2rem 1.2rem 0 1.2rem"}}>Thêm địa chỉ</button>
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
                <div className="indicator"></div>
              </>
              : ""}
            <div className="address-body">
              Địa chỉ: {add.addressDetails}, {add.ward}, {add.district}, {add.city}
            </div>
            <div className="address-footer">
              <button className="btn primary-btn nm dark" onClick={e => changeShipping(add)}>Giao đến địa chỉ này</button>
              <button className="btn light-btn nm light" onClick={e => editAddress(add)}>Chỉnh sửa</button>
              <button className="btn nm danger-btn">Xóa</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AddressList

