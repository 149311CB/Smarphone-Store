import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {withRouter} from "react-router-dom"
import {Link, useHistory} from 'react-router-dom'
import {deleteAddressAction, getAddressListByUserAction} from '../actions/AddressActions'
import primaryAddrr from '../right.png'
import ClipLoader from "react-spinners/ClipLoader";

const AddressList = ({width,grow, buttonsWidth, flexContainer, hideShipping,location}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { pathname } = location
  const {loading, error, addressList} = useSelector(state => state.addressListByUser)
  const {loading:deleteLoading,error:deleteError,message:deleteMessage} = useSelector(state => state.deleteAddress)
  const user = JSON.parse(localStorage.getItem("userInfo"))

  const addAddress =() =>{
    if(pathname.includes("checkout")){
      history.push("/checkout#addaddress")
    }else{
      history.push("/account/addresslist/add")
    }
  }

  const changeShipping = (add) => {
    localStorage.setItem("shipping", JSON.stringify(add))
    history.goBack()
  }

  const editAddress = (id) => {
    dispatch({type:"RESET_ADDRESS_MOTHERFUCKER"})
    if(pathname.includes("checkout")){
      history.push(`/checkout#editaddress/${id}`)
    }else{
      history.push("/account/addresslist/edit")
    }
  }

  const deleteAddress =(add) =>{
    dispatch(deleteAddressAction(add))
  }

  useEffect(() => {
    if(addressList == null || deleteMessage){
      dispatch(getAddressListByUserAction())
    }
  }, [deleteMessage])

  return (
      <>

    <div className="address-list-container"
         style={flexContainer} >
      {loading || loading == null || deleteLoading
          ?
          <div className="loader"><ClipLoader color={"#A7c080"} size={100} /></div>
          :
          <>
            <div style={{width:"100%"}}>
      <button className="btn primary-btn lg"
              style={{margin: "1.2rem 1.2rem 0 1.2rem"}}
              onClick={addAddress}>Thêm địa chỉ</button>
            </div>
      {addressList != null
      ?
      <div className="address-list" style={{width:`${ width }%`}}>
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
            <div className="address-footer" style={{width:`${buttonsWidth}%`}}>
              {hideShipping &&<button className="btn primary-btn nm dark" onClick={e => changeShipping(add)}>Giao đến địa chỉ này</button>}
              <button className="btn light-btn nm light" onClick={e => editAddress(add._id)}>Chỉnh sửa</button>
              {add.isPrimary === 0 && <button className="btn nm danger-btn" onClick={e => deleteAddress(add._id)}>Xóa</button>}
            </div>
          </div>
        ))}
      </div>
          :
          <p style={{margin:"1.2rem"}}>You don't have any address yet</p>}
      </>
      }
    </div>
      </>
  )
}

export default withRouter(AddressList)